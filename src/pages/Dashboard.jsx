import moment from 'moment';

const Dashboard = () => {
    const date = moment().format('lll');
    return (
        <div>
            <p>{date}</p>
        </div>
    );
};

export default Dashboard;