
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faq() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{margin:"50px"}}>
        <h1>Frequently asked questions</h1>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 ,fontFamily:"inherit",fontWeight:"500"}}>
          How to request a ride?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary' }}>
          <h5>To request an eco-ride follow the next steps:</h5>

 when open the app tap “choose pickup location”, the app will set your pickup location via GPS;
-if you need to change the location, type in your exact address. You can also input your destination there;
-choose “Request uberX”.
If you’re getting message “No cars available”, please wait a couple of minutes and try to request again.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ flexShrink: 0,fontFamily:"inherit",fontWeight:"500" }}>Users</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary' }}>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ flexShrink: 0 ,fontFamily:"inherit",fontWeight:"500"}}>
            Advanced settings
          </Typography>
       
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary' }}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ flexShrink: 0,fontFamily:"inherit",fontWeight:"500" }}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary' }}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
