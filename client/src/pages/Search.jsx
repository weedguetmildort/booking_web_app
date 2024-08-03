// import React from 'react';
// import { Card, CardContent, Typography, Grid, Link } from '@mui/material';

// function Search() {
//   const searchResultsArray = JSON.parse(localStorage.getItem("search")) || [];

//   return (
//     <div>
//       {/* Heading */}
//       <Typography variant="h4" component="h1" gutterBottom align="center">
//         Search Results
//       </Typography>

//       {/* Search Results */}
//       <Grid container spacing={8} padding={2}>
//         {searchResultsArray.map((item, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Card
//               variant="outlined"
//               sx={{
//                 minWidth: 275,   // Set minimum width
//                 minHeight: 250,  // Set minimum height
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   <Link
//                     href={`http://localhost:3000/partner/${item.pID}`}
//                     underline="hover"
//                     color="primary"
//                   >
//                     {item.businessname}
//                   </Link>
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   About Us: {item.aboutus}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Address: {item.address}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   State: {item.state}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   ZIP: {item.zip}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Services: {item.servicename}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default Search;

import React from 'react';
import { Card, CardContent, Typography, Grid, Link } from '@mui/material';

function Search() {
  const searchResultsArray = JSON.parse(localStorage.getItem("search")) || [];

  return (
    <div>
      {/* Heading */}
      <Typography variant="h4" component="h1" gutterBottom align="left" padding={2}>
        Search Results:
      </Typography>

      {/* Search Results */}
      <Grid container spacing={8} padding={2}>
        {searchResultsArray.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              variant="outlined"
              sx={{
                minWidth: 275,   // Set minimum width
                minHeight: 250,  // Set minimum height
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  <Link
                    href={`http://localhost:3000/partner/${item.pID}`}
                    underline="hover"
                    color="primary"
                  >
                    {item.businessname}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  About Us: {item.aboutus}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {item.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  State: {item.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ZIP: {item.zip}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Services: {item.servicename}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Search;
