// import { useState, useEffect } from 'react'
// import * as crudService from '../../services/crudService'
// import * as authService from '../../services/authService'
// import AuthNavbar from '../AuthNavbar/AuthNavbar'
// import Board from '../Board/Board'

// const AppPage = ({ user, setUser }) => {
//     const [applications, setApplications] = useState([]);
//     const [filter, setFilter] = useState('All');

//     useEffect(() => {
//         fetchApplications();
//     }, []);

//     const fetchApplications = async () => {
//         const apps = await crudService.getAllApplications();
//         setApplications(apps);
//     };

//     const handleAddApplication = async () => {
//         // This is a placeholder. You'd typically open a form to get application details.
//         const newApp = await crudService.createApplication({
//             position: 'New Position',
//             company: 'New Company',
//             status: 'applied',
//             application_date: new Date().toISOString()
//         });
//         setApplications([...applications, newApp]);
//     };

//     const handleDeleteApplication = async (id) => {
//         await crudService.deleteApplication(id);
//         setApplications(applications.filter(app => app.id !== id));
//     };

//     const handleSignOut = () => {
//         authService.signOut()
//         setUser(null)
//     }


//     const filteredApplications = applications.filter(app => {
//         return filter === 'All' || app.status.toLowerCase() === filter.toLowerCase();
//     });

//     return (
//         <div className="flex bg-gray-900 text-white h-screen">
//             <AuthNavbar
//                 onFilterChange={setFilter}
//                 onSignOut={handleSignOut}
//                 userName={user.username}
//             />
//             <Board
//                 applications={filteredApplications}
//                 onAddApplication={handleAddApplication}
//                 onDeleteApplication={handleDeleteApplication}
//             />
//         </div>
//     );
// };

// export default AppPage;