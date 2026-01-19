const BASE_URL = "http://localhost:5100";

export interface Activity {
    id: number;
    name: string;
    xp: number;
    level: number;
    xpToNext: number;
}

export async function getAllActivities(): Promise<Activity[]> {
    const res = await fetch(`${BASE_URL}/activities`);

    if(!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch activities");

    }
    return res.json();
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

    const r = await res.json();

    return {
        id: r.id,
        name: r.name,
        xp: r.xp,
        level: r.level,
        xpToNext: r.xpToNext, // MUST exist from backend
    };
}

export async function getActivity(activityId: number): Promise<Activity> {
    const res = await fetch(`${BASE_URL}/activities/${activityId}`);

    if(!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch activity");

    }

    const rows = await res.json();
    return rows.map((r: any) => ({
        id: r.id,
        name: r.name,
        xp: r.xp,
        level: r.level,
        xpToNext: r.xpToNext,

    }));
}


