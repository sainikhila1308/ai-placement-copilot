import PlacementTrackerComponent from "../components/PlacementTracker";
import "../styles/placement.css";
import "../styles/placementTracker.css";

function PlacementTracker() {

    return (

        <div className="placement-page">

            <h1 className="placement-title">

                📋 Placement Tracker

            </h1>

            <p className="placement-subtitle">

                Track and manage all your job applications.

            </p>

            <PlacementTrackerComponent />

        </div>

    );

}

export default PlacementTracker;