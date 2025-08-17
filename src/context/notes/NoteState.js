import NoteContext from "./NoteContext";
import { useState } from "react";

export default function NoteState(props) {

    const allNotes = [
        {
            "_id": "6888d001de1d28686c55a5d1",
            "user": "688784bee11477d21cc2ba73",
            "title": "Grocery List",
            "description": "Buy milk, bread, eggs, and some fresh vegetables like carrots, spinach, and tomatoes before Friday. Also check if we need coffee, tea, or any cleaning supplies like detergent.",
            "tag": "Personal",
            "date": "2025-08-05T08:15:22.000Z",
            "__v": 0
        },
        {
            "_id": "6888d002de1d28686c55a5d2",
            "user": "688784bee11477d21cc2ba73",
            "title": "Team Meeting Notes",
            "description": "We discussed Q3 goals including launching the new feature set, fixing long-standing bugs, and updating the onboarding flow. Everyone must submit task breakdowns by end of this week.",
            "tag": "Work",
            "date": "2025-08-04T10:45:30.000Z",
            "__v": 0
        },
        {
            "_id": "6888d003de1d28686c55a5d3",
            "user": "688784bee11477d21cc2ba73",
            "title": "Book Ideas",
            "description": "Outline main characters and build the initial plot focusing on the ethical dilemmas faced by an AI system that gains consciousness. Consider themes like autonomy, memory, and control.",
            "tag": "Creative",
            "date": "2025-08-03T16:12:10.000Z",
            "__v": 0
        },
        {
            "_id": "6888d004de1d28686c55a5d4",
            "user": "688784bee11477d21cc2ba73",
            "title": "Learn GraphQL",
            "description": "Start with the GraphQL official documentation, watch a couple of YouTube tutorials, and then build a small API to understand how queries, mutations, and resolvers work together.",
            "tag": "Study",
            "date": "2025-08-02T09:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "6888d005de1d28686c55a5d5",
            "user": "688784bee11477d21cc2ba73",
            "title": "Trip Checklist",
            "description": "Ensure all essentials are packed: clothes for 3 days, chargers, camera, valid ID, bus tickets, emergency cash, and personal toiletries. Check Pokhara weather before final packing.",
            "tag": "Travel",
            "date": "2025-08-01T07:32:10.000Z",
            "__v": 0
        },
        {
            "_id": "6888d006de1d28686c55a5d6",
            "user": "688784bee11477d21cc2ba73",
            "title": "Daily Gratitude",
            "description": "Today I’m grateful for my supportive family, good health, the opportunity to learn new things, and a peaceful moment enjoying my morning coffee in the balcony before work.",
            "tag": "Wellbeing",
            "date": "2025-08-01T21:04:45.000Z",
            "__v": 0
        },
        {
            "_id": "6888d007de1d28686c55a5d7",
            "user": "688784bee11477d21cc2ba73",
            "title": "Fix Navbar Bug",
            "description": "The navbar overlaps with content on smaller screens. Investigate whether the issue is due to flex settings or padding/margin misalignment, and test fixes across all devices.",
            "tag": "Work",
            "date": "2025-08-02T13:20:05.000Z",
            "__v": 0
        },
        {
            "_id": "6888d008de1d28686c55a5d8",
            "user": "688784bee11477d21cc2ba73",
            "title": "Gym Routine",
            "description": "Split routine into upper body (Mon/Wed/Fri) and cardio (Tue/Thu). Include warm-ups, stretching, and track sets and reps in workout app. Try to hit gym before 7:30 AM daily.",
            "tag": "Fitness",
            "date": "2025-08-06T06:50:15.000Z",
            "__v": 0
        },
        {
            "_id": "6888d009de1d28686c55a5d9",
            "user": "688784bee11477d21cc2ba73",
            "title": "Birthday Gift Ideas",
            "description": "Consider thoughtful gift options like a watch, a hardcover novel by their favorite author, a self-care kit with scented candles, or maybe even a voucher for a relaxing spa day.",
            "tag": "Personal",
            "date": "2025-08-05T18:34:21.000Z",
            "__v": 0
        },
        {
            "_id": "6888d00ade1d28686c55a5da",
            "user": "688784bee11477d21cc2ba73",
            "title": "Fix Resume",
            "description": "Update resume with the latest full-stack project, add new skills like GraphQL and Docker, and adjust formatting to highlight achievements. Double-check spelling and export to PDF.",
            "tag": "Career",
            "date": "2025-08-07T10:22:08.000Z",
            "__v": 0
        },
        {
            "_id": "6888d00bde1d28686c55a5db",
            "user": "688784bee11477d21cc2ba73",
            "title": "Ideas for Reels",
            "description": "Create short-form videos showing behind-the-scenes setups, quick 3-step tutorials, productivity hacks, or morning routines. Focus on adding captions and trending audio tracks.",
            "tag": "Content",
            "date": "2025-08-06T15:55:12.000Z",
            "__v": 0
        },
        {
            "_id": "6888d00cde1d28686c55a5dc",
            "user": "688784bee11477d21cc2ba73",
            "title": "Practice Meditation",
            "description": "Start each day with a 10-minute breathing session. Sit comfortably, focus on breath, and let go of distractions. Track progress weekly and try different meditation apps if needed.",
            "tag": "Wellbeing",
            "date": "2025-08-08T06:30:00.000Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(allNotes);

    const addNote = (title, description, tag)=>{
        const note = {
            "_id": "61322f119553781a8ca8d0e08",
            "user": "6131dc5e3e4037cd4734a0664",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
        };
        setNotes(notes.concat(note)); 
    }

    const deleteNote = (id)=>{
        setNotes(notes.filter((note)=>{return note._id!==id}));
    }

    const editNote = (id, title, description, tag) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
            note._id === id ? {...note, title, description, tag: tag === ""?"Default":tag} : note
            )
        );
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}
