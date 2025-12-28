import { useState } from 'react';

type Skill = {
    id: number;  //static
    name: string;  //static
    level: number;  //dynamic
    xp: number;  //dynamic
    xpToNext: number;  //dynamic
};


function SkillTracker() {
    const [skills, setSkills] = useState<Skill[]>([
        { id: 1, name: "Studying", level: 0, xp: 0, xpToNext: 100},
        { id: 2, name: "Internship", level: 0, xp: 0, xpToNext: 100},
        { id: 3, name: "Job Applications", level: 0, xp: 0, xpToNext: 100},
        { id: 4, name: "Leetcode", level: 0, xp: 0, xpToNext: 100},
    ]);
    
    // function showSkills(){
    //     return (
    //         <ul>
    //             {skills.map((skill) => (
    //                 <li key={skill.id}>
    //                     <strong>{skill.name}</strong>
    //                     <div>Level: {skill.level}</div>
    //                     <div>XP: {skill.xp} / {skill.xpToNext}</div>
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // }
    
    function addXP(id: number, amount: number){
        setSkills((previousSkills: Skill[]) => 
            previousSkills.map((skill: Skill) => {
                if (skill.id !== id) return skill;
    
    
                let newXP = skill.xp + amount;
                let newLevel = skill.level;
                let newXPToNext = skill.xpToNext;
    
                while (newXP >= newXPToNext) {      //LEVEL UP LOGIC
                    newXP -= newXPToNext;
                    newLevel += 1;
                    newXPToNext = Math.floor(newXPToNext * 1.2);
                }
                return{
                    ...skill,
                    xp: newXP,
                    level: newLevel,
                    xpToNext: newXPToNext,
                };
        }));
    }


    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <header className ="text-center mb-8">
                <h1 className="text-4xl font-extrabold tracking-wide mb-2">
                    LifeScape progression Tracker
                </h1>
                <p className="text-sm text-slate-400">
                    Gamify your goals. No grinds wasted.
                </p>
            </header>


            <div className="grid gap-6 md:grid-cols-2">
                {skills.map((skill: Skill) => {
                    const progress = 
                        skill.xpToNext > 0 ? Math.min((skill.xp / skill.xpToNext) * 100, 100) : 0;

                    return (
                        <div key={skill.id} className="bg-slate-900 border border-slate-700/60 rounded-2xl p-4 shadow-x1 shadow-black/40">
                            {/*card header*/}
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-semibold text-lg">
                                    {skill.name}
                                </div>
                                <div className="inline-flex items-center justify-center rounded-full bg-emerald-400 text-slate-900 font-extrabold text-sm min-w-[2.5rem] h-8">
                                    {skill.level}
                                </div>
                            </div>


                            {/*Progress bar*/}
                            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-2">
                                <div
                                    className="h-full bg-emerald-400 transition-all duration-200"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>


                            {/*xp row*/}
                            <div className="flex justify-between text-xs text-slate-400 mb-4">
                                <span>XP: {skill.xp.toLocaleString()}</span>
                                <span>Next: {skill.xpToNext.toLocaleString()} XP</span>
                            </div>

                            {/* XP buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => addXP(skill.id, 10)}
                                    className="flex-1 rounded-full bg-amber-400 text-slate-900 text-xs font-semibold py-2 shadow-lg shadow-amber-500/30 hover:bg-amber-300 active:translate-y-px active: shadow-none transition"
                                >
                                    +10 XP
                                </button>
                                <button
                                    onClick={() => addXP(skill.id, 25)}
                                    className="flex-1 rounded-full bg-amber-400 text-slate-900 text-xs font-semibold py-2 shadow-lg shadow-amber-500/30 hover:bg-amber-300 active:translate-y-px active: shadow-none transition"
                                >
                                    +25 XP
                                </button>
                                <button
                                    onClick={() => addXP(skill.id, 50)}
                                    className="flex-1 rounded-full bg-amber-400 text-slate-900 text-xs font-semibold py-2 shadow-lg shadow-amber-500/30 hover:bg-amber-300 active:translate-y-px active: shadow-none transition"
                                >
                                    +50 XP
                                </button>
                            </div>


                        </div>  
                    );  
                })}

            </div>

            {/*XP rules card */}
            <div className="mt-10 bg-slate-900 border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-black/40">
                <h2 className="text-xl font-bold mb-3">XP Rules / Activity Guide</h2>
                <p className="text-sm text-slate-300 mb-2">sample rulebook</p>
                
                
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                    <li><span className="font-semibold">Studying: </span>10XP per pomodoro</li>
                    <li><span className="font-semibold">Internship: </span>10XP per pomodoro</li>
                    <li><span className="font-semibold">Job Application: </span>10XP per application, 50XP per resume update</li>
                    <li><span className="font-semibold">Leetcode: </span>10XP per easy, 25 per medium, 50 per hard</li>
                </ul>
                <p className="text-xs text-slate-500 mt-3">
                    Edit these rules in <code>SkillTracker.tsx</code> whenever you tweak rules.
                </p>
            </div>


        </div>





        // <ul>
        //     {skills.map(skill=> (
        //         <li key={skill.id}>
        //             <strong>{skill.name}</strong>
        //             <div>Level: {skill.level}</div>
        //             <div>XP: {skill.xp} / {skill.xpToNext}</div>

        //             <button onClick={() => addXP(skill.id, 10)}>+10 XP</button>
        //         </li>
        //     ))}
        // </ul>
    );
}

export default SkillTracker;


