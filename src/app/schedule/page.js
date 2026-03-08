'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { programs } from '@/data/content';
import styles from './schedule.module.css';

export default function Schedule() {
    const [userPrograms, setUserPrograms] = useState([]);
    const [plannerMode, setPlannerMode] = useState(false);
    const [newProgram, setNewProgram] = useState({
        day: '',
        name: '',
        time: '',
        location: '',
    });

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const addProgram = () => {
        if (newProgram.day && newProgram.name && newProgram.time) {
            setUserPrograms([...userPrograms, { ...newProgram, id: Date.now() }]);
            setNewProgram({ day: '', name: '', time: '', location: '' });
        }
    };

    const removeProgram = (id) => {
        setUserPrograms(userPrograms.filter(p => p.id !== id));
    };

    const clearAll = () => {
        setUserPrograms([]);
    };

    const downloadICS = () => {
        // Simple ICS generation
        let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Laramie Community Hub//EN\n';

        userPrograms.forEach(program => {
            icsContent += `BEGIN:VEVENT\n`;
            icsContent += `SUMMARY:${program.name}\n`;
            icsContent += `DESCRIPTION:${program.location || 'No location specified'}\n`;
            icsContent += `END:VEVENT\n`;
        });

        icsContent += 'END:VCALENDAR';

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'laramie-programs.ics';
        a.click();
    };

    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <h1 className="text-center mb-xl">Program Schedule</h1>

                    <div className={styles.controls}>
                        <button
                            onClick={() => setPlannerMode(!plannerMode)}
                            className="btn btn-secondary"
                        >
                            {plannerMode ? '📋 List View' : '📅 Planner Mode'}
                        </button>
                        <div className={styles.dataControls}>
                            <button onClick={clearAll} className="btn btn-secondary">Clear</button>
                            <button onClick={downloadICS} className="btn btn-primary">Download .ics</button>
                        </div>
                    </div>

                    {/* Quick Add Form */}
                    <div className={`card ${styles.quickAdd}`}>
                        <h3>Quick Add Program</h3>
                        <div className={styles.formGrid}>
                            <select
                                value={newProgram.day}
                                onChange={(e) => setNewProgram({ ...newProgram, day: e.target.value })}
                                className={styles.input}
                            >
                                <option value="">Select Day</option>
                                {daysOfWeek.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Program Name"
                                value={newProgram.name}
                                onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Time (e.g., 3:00 PM)"
                                value={newProgram.time}
                                onChange={(e) => setNewProgram({ ...newProgram, time: e.target.value })}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={newProgram.location}
                                onChange={(e) => setNewProgram({ ...newProgram, location: e.target.value })}
                                className={styles.input}
                            />
                        </div>
                        <button onClick={addProgram} className="btn btn-primary mt-md">
                            Add to Schedule
                        </button>
                    </div>

                    {/* Schedule Display */}
                    {plannerMode ? (
                        <div className={styles.plannerView}>
                            {daysOfWeek.map(day => (
                                <div key={day} className={styles.dayColumn}>
                                    <h3>{day}</h3>
                                    <div className={styles.programList}>
                                        {userPrograms
                                            .filter(p => p.day === day)
                                            .map(program => (
                                                <div key={program.id} className={styles.programCard}>
                                                    <strong>{program.name}</strong>
                                                    <div>{program.time}</div>
                                                    {program.location && <div className="text-muted">{program.location}</div>}
                                                    <button
                                                        onClick={() => removeProgram(program.id)}
                                                        className={styles.removeBtn}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.listView}>
                            <div className="card">
                                <h3>My Programs</h3>
                                {userPrograms.length === 0 ? (
                                    <p className="text-muted">No programs added yet. Use the form above to add programs.</p>
                                ) : (
                                    <div className={styles.programTable}>
                                        {userPrograms.map(program => (
                                            <div key={program.id} className={styles.programRow}>
                                                <div>
                                                    <strong>{program.day}</strong>: {program.name} at {program.time}
                                                    {program.location && ` - ${program.location}`}
                                                </div>
                                                <button
                                                    onClick={() => removeProgram(program.id)}
                                                    className={styles.removeBtn}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="card mt-lg">
                                <h3>Available Programs</h3>
                                <p className="text-muted mb-md">Auto-imported from database</p>
                                <div className="grid grid-2">
                                    {programs.slice(0, 4).map(program => (
                                        <div key={program.id} className={styles.availableProgram}>
                                            <strong>{program.name}</strong>
                                            <div className="text-muted">{program.days} • {program.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
