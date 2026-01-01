const BASE_URL = "http://localhost:5000";

export interface Activity {
    id: number;
    name: string;
    xp: number;
}

export async function addXp(activityId: number, amount: number): Promise<Activity> {
    const res = await fetch(`${BASE_URL}/activities/${activityId}/xp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
    });


    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add XP");
    }

    return res.json(); //{id, name, xp}
}

export async function getActivity(activityId: number): Promise<Activity> {
    const res = await fetch(`${BASE_URL}/activities/${activityId}`);

    if(!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch activity");

    }
    return res.json(); //{id, name, xp}
}


