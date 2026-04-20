import { NextResponse } from "next/server";

const GEOCODE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";
const ROUTES_ENDPOINT = "https://routes.googleapis.com/directions/v2:computeRoutes";

function getRequiredNumberEnv(name) {
  const rawValue = process.env[name];
  const parsedValue = Number(rawValue);

  if (!rawValue || !Number.isFinite(parsedValue)) {
    throw new Error(`Missing or invalid environment variable: ${name}`);
  }

  return parsedValue;
}

function getMapsConfig() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing environment variable: GOOGLE_MAPS_API_KEY");
  }

  return {
    apiKey,
    originLat: getRequiredNumberEnv("EASYBATT_ORIGIN_LAT"),
    originLng: getRequiredNumberEnv("EASYBATT_ORIGIN_LNG"),
    originLabel: process.env.EASYBATT_ORIGIN_LABEL || "sede EasyBatt",
  };
}

function isPostalOrLocalityOnly(query) {
  const normalized = query.trim();
  const hasStreetKeyword = /(via|viale|piazza|corso|vicolo|largo|piazzale|strada|road|street|avenue|boulevard)/i.test(normalized);
  const hasStreetNumber = /\b\d{1,5}[A-Za-z]?\b/.test(normalized);

  return !(hasStreetKeyword && hasStreetNumber);
}

function mapGeocodeStatusToMessage(status) {
  if (status === "ZERO_RESULTS") {
    return "Calcolo non riuscito: inserisci i km manualmente";
  }

  if (status === "REQUEST_DENIED" || status === "INVALID_REQUEST") {
    return "Configurazione mappe non valida: controlla le chiavi API.";
  }

  return "Calcolo non riuscito: inserisci i km manualmente";
}

async function geocodeDestination(destinationQuery, apiKey) {
  const geocodeUrl = `${GEOCODE_ENDPOINT}?address=${encodeURIComponent(destinationQuery)}&language=it&region=it&key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(geocodeUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Geocoding request failed");
  }

  const data = await response.json();

  if (data.status !== "OK" || !data.results?.length) {
    throw new Error(mapGeocodeStatusToMessage(data.status));
  }

  const result = data.results[0];
  const location = result.geometry?.location;

  if (!location || !Number.isFinite(location.lat) || !Number.isFinite(location.lng)) {
    throw new Error("Calcolo non riuscito: inserisci i km manualmente");
  }

  return {
    lat: location.lat,
    lng: location.lng,
    formattedAddress: result.formatted_address || destinationQuery,
    locationType: result.geometry?.location_type || "",
  };
}

async function computeRoundTripKm({ originLat, originLng, destinationLat, destinationLng, apiKey }) {
  const response = await fetch(ROUTES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "routes.distanceMeters",
    },
    body: JSON.stringify({
      origin: {
        location: {
          latLng: {
            latitude: originLat,
            longitude: originLng,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destinationLat,
            longitude: destinationLng,
          },
        },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      units: "METRIC",
      computeAlternativeRoutes: false,
      languageCode: "it-IT",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Route computation failed");
  }

  const data = await response.json();
  const distanceMeters = data?.routes?.[0]?.distanceMeters;

  if (!Number.isFinite(distanceMeters)) {
    throw new Error("Calcolo non riuscito: inserisci i km manualmente");
  }

  return Number(((distanceMeters * 2) / 1000).toFixed(1));
}

export async function POST(request) {
  try {
    const { destinationQuery } = await request.json();

    if (!destinationQuery || typeof destinationQuery !== "string" || !destinationQuery.trim()) {
      return NextResponse.json(
        { error: "Inserisci indirizzo o CAP/località prima di calcolare i km." },
        { status: 400 },
      );
    }

    const config = getMapsConfig();
    const geocodedDestination = await geocodeDestination(destinationQuery, config.apiKey);
    const returnKm = await computeRoundTripKm({
      originLat: config.originLat,
      originLng: config.originLng,
      destinationLat: geocodedDestination.lat,
      destinationLng: geocodedDestination.lng,
      apiKey: config.apiKey,
    });

    const isApproximate =
      isPostalOrLocalityOnly(destinationQuery) ||
      geocodedDestination.locationType === "GEOMETRIC_CENTER" ||
      geocodedDestination.locationType === "APPROXIMATE";

    return NextResponse.json({
      returnKm,
      precision: isApproximate ? "approx" : "exact",
      resolvedAddress: geocodedDestination.formattedAddress,
      originLabel: config.originLabel,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Calcolo non riuscito: inserisci i km manualmente";

    const isConfigurationError = message.includes("environment variable");

    return NextResponse.json(
      {
        error: isConfigurationError
          ? "Configurazione mappe incompleta sul server."
          : message,
      },
      { status: isConfigurationError ? 500 : 422 },
    );
  }
}
