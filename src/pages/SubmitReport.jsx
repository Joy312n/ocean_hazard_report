import { useState } from "react";

export default function SubmitReport() {
  const [form, setForm] = useState({ description: "", image: null });

  return (
    <div className="flex justify-center py-16">
      <form className="w-full max-w-md p-6 border rounded shadow space-y-4">
        <h2 className="text-xl font-bold">Submit Hazard Report</h2>
        <textarea 
          className="w-full border p-2 rounded"
          placeholder="Describe the hazard..."
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
}
