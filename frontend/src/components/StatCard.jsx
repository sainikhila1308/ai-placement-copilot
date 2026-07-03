import "../styles/statCard.css";

function StatCard({
    icon,
    title,
    value,
    subtitle,
    iconColor,
    valueColor
}) {

    return (

        <div className="stat-card">

            <div
                className="stat-icon"
                style={{ background: iconColor }}
            >
                {icon}
            </div>

            <h4>{title}</h4>

            <h1
                style={{ color: valueColor }}
            >
                {value}
            </h1>

            <p>{subtitle}</p>

        </div>

    );

}

export default StatCard;