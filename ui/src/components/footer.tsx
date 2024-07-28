import Box from '@mui/material/Box';
const Play=[{value:"Play Individual",link:"/playindividual"},{value:"Bidding help",link:"/Bidding-help"},{value:"BetBrains Gift Cards",link:"/BetBrains-Gift-Cards"}]
const Challenge=[{value:"Take a Challenge",link:"/takeachallenge"}]
const AboutAucHubLinks=[{value:"Company info",link:"/Company-info"},{value:"Advertise with us",link:"/Advertise-with-us"},{value:"Policies",link:"/Policies"}]
const HelpContactLinks=[{value:"Contact Us",link:"/Contact-Us"}]
export function footer() {
    return (
        <Box className="footer-box">
            <Box className="footer-heading footer-heading-1">
                {/* <img src={logo} alt="AucHub" className="footer-logo" /> */}
            </Box>
            <Box className="footer-heading footer-heading-2">
                <p>Play</p>
                <ul>
                    {Play.map((item,index)=>(
                        <li key={index}><a href={item.link}>{item.value}</a></li>
                    ))} 
                </ul>
            </Box>
            <Box className="footer-heading footer-heading-3">
                <p>Challenge</p>
                <ul>
                    {Challenge.map((item,index)=>(
                        <li key={index}><a href={item.link}>{item.value}</a></li>
                    ))}
                </ul>
            </Box>
            <Box className="footer-heading footer-heading-4">
                <p>About BetBrains</p>
                <ul>
                    {AboutAucHubLinks.map((item,index)=>(
                        <li key={index}><a href={item.link}>{item.value}</a></li>
                    ))}
                </ul>
            </Box>
            <Box className="footer-heading footer-heading-5">
                <p>Help & Contact</p>
                <ul>
                    {HelpContactLinks.map((item,index)=>(
                        <li key={index}><a href={item.link}>{item.value}</a></li>
                    ))}
                </ul>
            </Box>
        </Box>
    );
}
export default footer;