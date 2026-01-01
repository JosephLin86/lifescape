import { addXp } from "../models/activityModel.js";
import { getActivity } from "../models/activityModel.js";

export async function addXpController(req, res){
    try{
        const {id} = req.params;
        const {amount} = req.body;

        const updated = await addXp(Number(id), Number(amount));

        if (!updated){
            return res.status(404).json({error: "Activity not found"});
        }

        res.json(updated);
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