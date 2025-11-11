export default function Timetable() {
  return (
    <section id="timetable" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Class Timetables</h2>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md overflow-x-auto">
        <p className="text-center text-gray-600 mb-6">
          Our weekly schedule is packed with learning opportunities. Course duration is 1 year.
        </p>
        <table className="w-full min-w-max text-center text-sm">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 font-semibold">Day</th>
              <th className="p-3 font-semibold">Morning (9am-1pm)</th>
              <th className="p-3 font-semibold">Afternoon (1pm-5pm)</th>
              <th className="p-3 font-semibold">Evening (5pm-9pm)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b">
              <td className="p-3 font-medium">Monday</td>
              <td></td>
              <td>YLE Flyers (3:30-5:30)</td>
              <td></td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="p-3 font-medium">Tuesday</td>
              <td></td>
              <td>YLE Movers (3:30-5:30)</td>
              <td></td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">Wednesday</td>
              <td>Spoken English - Ladies (9:15-11:15)</td>
              <td>English for Beginners (3:30-5:30)</td>
              <td></td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="p-3 font-medium">Thursday</td>
              <td></td>
              <td>Jolly Phonics (3:30-5:30)</td>
              <td></td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">Friday</td>
              <td></td>
              <td>YLE Starters (3:30-5:30)</td>
              <td></td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="p-3 font-medium">Saturday</td>
              <td>YLE Starters (9:30-11:30) <br/> YLE Movers (1:30-3:30)</td>
              <td>YLE Flyers (11:30-1:30)</td>
              <td></td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">Sunday</td>
              <td>PET Group 1 (11:30-1:30)</td>
              <td>KET Group 1 (1:30-3:30) <br/> FCE Group 1 (3:30-5:30)</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
