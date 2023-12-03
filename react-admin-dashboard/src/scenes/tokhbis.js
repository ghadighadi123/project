// RealtimeData.js
// import { ref, onValue } from 'firebase/database';
// import {db} from "firebase/database";

// class RealtimeData {
//   static async getTeamData() {
//     const dbRef = ref(db, 'team');

//     try {
//       const snapshot = await onValue(dbRef);
//       const teamData = [];

//       snapshot.forEach((childSnapshot) => {
//         const key = childSnapshot.key;
//         const data = childSnapshot.val();
//         teamData.push({ id: key, ...data });
//       });

//       return teamData;
//     } catch (error) {
//       console.error('Error fetching team data:', error);
//       throw error;
//     }
//   }
// }

// export default RealtimeData;
