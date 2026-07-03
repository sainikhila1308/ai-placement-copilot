const Job = require("../models/Jobs");

const getDashboardStats = async (req, res) => {

    try {

        const jobs = await Job.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        const stats = {
            totalJobs: jobs.length,
            applied: 0,
            interview: 0,
            selected: 0,
            rejected: 0,
            recentJobs: jobs.slice(0, 5)
        };

        jobs.forEach(job => {

            switch(job.status){

                case "Applied":
                    stats.applied++;
                    break;

                case "Interview":
                    stats.interview++;
                    break;

                case "Selected":
                    stats.selected++;
                    break;

                case "Rejected":
                    stats.rejected++;
                    break;

            }

        });

        stats.successRate =
            stats.totalJobs === 0
            ? 0
            : Math.round(
                (stats.selected / stats.totalJobs) * 100
            );

        res.json(stats);

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = {
    getDashboardStats
};