import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PlacementTracker() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
const [filterStatus, setFilterStatus] = useState("All");
const [editingJob, setEditingJob] = useState(null);


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "`${import.meta.env.VITE_API_URL}/api/jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addJob = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/jobs`,
        {
          company,
          role,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();

      setCompany("");
      setRole("");
      setStatus("");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
        filterStatus === "All" ||
        job.status === filterStatus;

    return matchesSearch && matchesStatus;

});
const saveChanges = async () => {

    try {

        const token = localStorage.getItem("token");

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/jobs/${editingJob._id}`,

            {
                company: editingJob.company,
                role: editingJob.role,
                status: editingJob.status,
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

        );

        fetchJobs();

        setEditingJob(null);

    } catch (error) {

        console.log(error);

    }

};

  return (
    <div>
     <div className="tracker-container">

<div className="form-card">

    <h2>📋 Add New Application</h2>
    

    <div className="form-group">

        <label>Company</label>

        <input
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
        />

    </div>

    <div className="form-group">

        <label>Role</label>

        <input
            type="text"
            placeholder="Enter job role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
        />

    </div>

    <div className="form-group">

        <label>Status</label>

        <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        >
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
        </select>

    </div>

    <button
        className="add-btn"
        onClick={addJob}
    >
        + Add Job
    </button>

</div>

</div>

<hr />

<h2 className="jobs-title">

📂 Your Applications

</h2>
<div className="filter-bar">

    <input
        type="text"
        placeholder="🔍 Search by company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
    >
        <option value="All">All Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
    </select>

</div>

{filteredJobs.length === 0 ? (

<div className="empty-state">

    <h2>🔍</h2>

    <h3>No applications found</h3>

    <p>

        Try another search or add a new application.

    </p>

</div>

) : (

    filteredJobs.map((job) => (

        <div
            className="job-card"
            key={job._id}
        >
    
            <div className="job-company">
    
                🏢 {job.company}
    
            </div>
    
            <div className="job-role">
    
                💼 {job.role}
    
            </div>
    
            <p className="job-date">
    
                📅 Added to your tracker
    
            </p>
    
            <div className="job-footer">

            <select
    className={`status-select status-${job.status.toLowerCase()}`}
    value={job.status}
    onChange={(e)=>
        updateStatus(job._id,e.target.value)
    }
>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
    </select>

    <div>

        <button
            className="edit-btn"
            onClick={() => setEditingJob(job)}
        >
            ✏ Edit
        </button>

        <button
            className="delete-btn"
            onClick={() => deleteJob(job._id)}
        >
            🗑 Delete
        </button>

    </div>

</div>
    
        </div>
    
    ))

)}
{editingJob && (

<div className="modal-overlay">

    <div className="modal">

        <h2>Edit Application</h2>

        <div className="form-group">

<label>Company</label>

<input
    type="text"
    value={editingJob.company}
    onChange={(e) =>
        setEditingJob({
            ...editingJob,
            company: e.target.value,
        })
    }
/>

</div>

<div className="form-group">

<label>Role</label>

<input
    type="text"
    value={editingJob.role}
    onChange={(e) =>
        setEditingJob({
            ...editingJob,
            role: e.target.value,
        })
    }
/>

</div>

<div className="form-group">

<label>Status</label>

<select
    value={editingJob.status}
    onChange={(e) =>
        setEditingJob({
            ...editingJob,
            status: e.target.value,
        })
    }
>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>
</select>

</div>

<div className="modal-buttons">

<button
    className="add-btn"
    onClick={saveChanges}
>
    Save Changes
</button>

<button
    className="delete-btn"
    onClick={() => setEditingJob(null)}
>
    Cancel
</button>

</div>

    </div>

</div>

)}
    </div>
  );
}

export default PlacementTracker;