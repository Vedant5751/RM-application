import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

// Assuming you have an API endpoint to fetch the new token
async function fetchNewToken() {
  const response = await fetch('/api/getNewToken');
  const data = await response.json();
  return data.accessToken;
}

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const getTokenAndEmbed = async () => {
      try {
        const newToken = await fetchNewToken();
        setAccessToken(newToken);
      } catch (error) {
        console.error('Failed to fetch new token', error);
      } finally {
        setIsLoading(false);
      }
    };

    getTokenAndEmbed();

    // Refresh token every 50 minutes
    intervalId = setInterval(getTokenAndEmbed, 50 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Add the dependency array to run the effect only once after the initial mount

  const handleEmbedError = async (event) => {
    const { detail: error } = event;
    // Check if the error is related to the access token
    if (error.statusCode === 401 || error.statusCode === 403) {
      console.log('Token-related error occurred, fetching new token...');
      try {
        const newToken = await fetchNewToken();
        setAccessToken(newToken);
      } catch (error) {
        console.error('Failed to fetch new token', error);
      }
    } else {
      console.error('An unexpected error occurred', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 bg-blue-200">Metric 1</div>
          <div className="col-span-1 bg-green-200">Metric 2</div>
          <div className="col-span-1 bg-yellow-200">Metric 3</div>
        </div>
        <div className="mt-10 border border-black">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <PowerBIEmbed
              style={{ height: '800px' }} // Inline style to set the height
              embedConfig={{
                type: 'report',
                id: '88612be8-585f-4641-a145-e5b7805eeb82',
                embedUrl: "https://app.powerbi.com/reportEmbed?reportId=88612be8-585f-4641-a145-e5b7805eeb82&groupId=4a61afc3-af74-429a-b757-95774e194958&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
                accessToken: 'H4sIAAAAAAAEAB2SR7KDRgBE7_K3uIokELjKC3IYRBiRd2SRBxBI4PLd_e19L7pfv79_3Owc5qz8-fMngJRGjxiXjmq9Gx6UJJ0Gve69Qbent7xCbSwL0iRG84B2dn3ycDBOvGHc1H4Sk7gTTeHV5zZdvUbX3f4cKrF1DWNZ97vlFE0rZ6vJncenxtH7aL-KjSVrEy0tT_rBoqwy0oFrFNQ29F39fAtZua0PsKcCGOaPSgEb4DMnKqrKAaoCnxEPWo_alefOrKezqHMsfa3bw_0qWZKP-p3Xa8GiH8ZbJ700UyJZEFjMbkZ6xJfz1tAxCcFe1057F1eJgRJLfQSz9FMkPT6JxNRUaeTsLhpbEod5U81KWBa65uVUod9s6R6fpdG410GROPfJcm12niB_DJlj6MgcFufVSgU05qHMfYV4dYI2-ChbWIYL4Ysfz1l0cHrxSehU8hdeUTFl4UeQp3Zl9TQghF3heEs9bK0Ofc5UJqcmMULRhTM5GGOFEEmT9E68jM327H0VG0lS7gDCo-1xZMmerei8c74c_GymtyU_n1jYX5fOceC9_U7rViPZvJclMmEID166ICC7ISWrFGj63d2K2D3GcThxure8jChupqkQW_qxHdvSHvU0Oomhu_bxgtDTWYNs-2iQ99ChR82jU3WOvO2eCO5Z5X1r-OpEj2Cbh77Au-jm2MEbw7oNcorCoQve9rh4aMKJ7ACpXCvmkYCBdgnIuMmBBHlxNi0YL2BvzGSRCcYIe092VSEHRWcdd-_L3Es9kCSR7cCdV_IyjFP9iVNik30ux1WNyUekMKADwvwxfr_tr4qfv37--JHWE71nUJ2_6puK-Ft-OT6rz8j-WWadvjqPA9Zp_D3QOyO2ODjijQ5i1ux6z6rOII6sgCDEjXkP4WEwKOK8c0rc6fvNSsoj4Fy_tWMyrC6vditN4m6-o1o2ye5WzyOkN1KoqXhVl6kZmGtc7VX3WWsY_ZecqWEf1Vk7ey1rarOf9eT9EVuBbRoC5ZI5e6HbToQkLdyr82wTfqLFbrGGnBfVHBfkFmEBgZ7l7WPdZIrIDHHNeMKzwq-O4eklaQMQakl8_h4QsIKmXDbgHnYsGnF_6-obmsFkzGa0oGQJosZXIjKnO8_XbYDZjJjBHCrhftaF2aYV1LHQZchi5C76NsGWMnhucpvqMvDO--t_zCd6VasR_lLOiAMT0Mzpikk1JWtOsuWWzf-pZ9tM2Xtfq9-YZouMX_FUMPAOp2QqGvMZ0fTAEok7jzIWLR4cNUkuj1jfWxD36qV_Hf56VgzRffw-kcwbvjnFcHdIyUmcsuwiIbPMlycghtNrfhDPFtNfCv-RkUAlNoXh10Lzu8TS6KBASA3o-bUB9ANXVr_QVFRIbnmkHck0Y8ib6z3UsM1g5_tVPcOw2z_PvQ_we-a_un1hCAdfPo9J88qSsR6EG5_KN_oegKF-NcypxzWTBd3npQsLHo9PP34UAyx7kAsvPgGqsnOt7IaKb1X8GBaY95KOddXNmM1wnAiVVMgyMYggHcetF9EFirorxLPBQ_fSVciH_pLa3j3AwUoR75QYy7V9l_yH-Z9_AUvDtgXuBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzE4NjU0MjU1LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=\n',
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: true
                    }
                  },
                }
              }}
              eventHandlers={
                new Map([
                  ['loaded', function () { console.log('Report loaded'); }],
                  ['rendered', function () { console.log('Report rendered'); }],
                  ['error', handleEmbedError],
                ])
              }
              cssClassName={"Embed-container"}
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
