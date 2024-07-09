export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/list-crossWord");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/list-crossWord", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return resData.places;
}

export async function fetchCurrentGrid() {
  const response = await fetch("http://localhost:3000/currentGrid");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }
  return resData.grid;
}

export async function updateCurrentGrid(grid) {
  const response = await fetch("http://localhost:3000/currentGrid", {
    method: "PUT",
    body: JSON.stringify({ grid }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return resData.places;
}
