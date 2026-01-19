import { addXp } from "../models/activityModel.js";
import { getActivity } from "../models/activityModel.js";
import { getAllActivities } from "../models/activityModel.js";
export async function addXpController(req, res){
    try{
        const {id} = req.params;
        const {amount} = req.body;

        const updated = await addXp(Number(id), Number(amount));

        if (!updated){
            return res.status(404).json({error: "Activity not found"});
        }

        res.json({
            id: updated.id,
            name: updated.name,
            xp: updated.xp,
            level: updated.level,
            xpToNext: updated.xpToNext,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
}

export async function getActivityController(req, res){
    try{
        const{ id } = req.params;
        const activity = await getActivity(Number(id));

        if(!activity){
            return res.status(404).json({error: "Activity not found"});
        }
        res.json(activity);
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export async function getAllActivitiesController(req, res) {
    try {
      const rows = await getAllActivities();
      const transformed = rows.map(row => ({
        id: row.id,
        name: row.name,
        xp: row.xp,
        level: row.level,
        xpToNext: row.xp_to_next,
      }));
      res.json(transformed);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }