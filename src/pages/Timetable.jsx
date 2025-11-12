// src/pages/Timetable.jsx

export default function Timetable() {
  
  // New schedule data from your checklist
  const schedule = [
    { 
      day: "Mondays", 
      times: [
        { time: "3:30 - 5:30 p.m.", class: "Flyers Group 1" }
      ] 
    },
    { 
      day: "Tuesdays", 
      times: [
        { time: "3:30 - 5:30 p.m.", class: "Movers Group 1" }
      ] 
    },
    { 
      day: "Wednesdays", 
      times: [
        { time: "9:15 - 11:15 a.m.", class: "Spoken English for Ladies" },
        { time: "3:30 - 5:30 p.m.", class: "Beginners" }
      ] 
    },
    { 
      day: "Thursdays", 
      times: [
        { time: "9:15 - 11:15 a.m.", class: "KET for Housewives" },
        { time: "3:30 - 5:30 p.m.", class: "Jolly Phonics" }
      ] 
    },
    { 
      day: "Fridays", 
      times: [
        { time: "3:30 - 5:30 p.m.", class: "Starters Group 1" }
      ] 
    },
    { 
      day: "Saturdays", 
      times: [
        { time: "7:30 - 9:30 a.m.", class: "KET Group 2" },
        { time: "9:30 - 11:30 a.m.", class: "Starters Group 2" },
        { time: "11:30 - 1:30 p.m.", class: "Flyers Group 2" },
        { time: "1:30 - 3:30 p.m.", class: "Movers Group 2" },
        { time: "3:30 - 5:30 p.m.", class: "Pre-starters" }
      ] 
    },
    { 
      day: "Sundays", 
      times: [
        { time: "7:30 - 9:30 a.m.", class: "FCE Group 2" },
        { time: "9:30 - 11:30 a.m.", class: "PET Group 3" },
        { time: "11:30 - 1:30 p.m.", class: "PET Group 1" },
        { time: "1:30 - 3:30 p.m.", class: "KET Group 1" },
        { time: "3:30 - 5:30 p.m.", class: "FCE Group 1" }
      ] 
    }
  ];

  return (
    <section id="timetable" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Class Timetables (From December)</h2>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg overflow-x-auto">
        <p className="text-center text-gray-600 mb-6">
          Our weekly schedule is packed with learning opportunities.
        </p>
        <div className="space-y-6">
          {schedule.map((day) => (
            <div key={day.day} className="grid md:grid-cols-4 gap-4 items-start">
              <h3 className="md:col-span-1 text-xl font-bold text-brand-blue md:text-right">
                {day.day}
              </h3>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {day.times.map((item) => (
                  <div key={item.class} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">{item.time}</p>
                    <p className="text-brand-blue">{item.class}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}