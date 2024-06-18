import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

// Assuming you have an API endpoint to fetch the new token
async function fetchNewToken() {
  const response = await fetch("/api/getNewToken");
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
        console.error("Failed to fetch new token", error);
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
      console.log("Token-related error occurred, fetching new token...");
      try {
        const newToken = await fetchNewToken();
        setAccessToken(newToken);
      } catch (error) {
        console.error("Failed to fetch new token", error);
      }
    } else {
      console.error("An unexpected error occurred", error);
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
        <div className="mt-10 border border-black h-screen">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <PowerBIEmbed
              embedConfig={{
                type: "report",
                id: "88612be8-585f-4641-a145-e5b7805eeb82",
                embedUrl:
                  "https://app.powerbi.com/reportEmbed?reportId=88612be8-585f-4641-a145-e5b7805eeb82&groupId=4a61afc3-af74-429a-b757-95774e194958&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
                accessToken:
                  "H4sIAAAAAAAEAB2Sta7EVgAF_-W1jrRmiJTCzLRmd2ZaM6yvo_x7XtJPc2bO3z9OBj5zVv78-fMQtAxaH40zWnoRcEtMQkmmR8C_vLXvrmfPmDBZavkqqJZTvYf4cBHe4axzkxhsbqnQ3epy-3h_faH3IvZYaAi9NWePTQmU8dwUKOn8fBvfrDN2LoUFB8NtNS-qJCzvTH0IV1enDM56i2vVZZNWnJfxJ1KVgRDgVnGqTLxEcS4ViCwmwbxIXrZThhHNVQ0oUInUuK3Bjhvup7KzxGNNZLYEkBsMXZEfWcrGbdK1YhEcZPI_Ettc3qow5_U29BVdp1YsniFkWhZND7r8nhqgjQ5CAzPMiDw0mvvE8kgMxRgO8bNdWvtRJVvjFULrrgWheoa9gVd-yQME9okCEQzT6-LGuQQO-pFeGRTQcfTCZieUVBzZwGh9eH6wqVY1rZsx89scKM9pt12tT1NKq7V9nbpQ6zqhweJDLt531DbxFS3CUIs0eNc7suyVotTUcLjnMhkaLSqltfFrWUKkT2DoWDO6SUdY-ia2hrY3RkByC7mwoq3tSn1Q_dOHE5vIZFIsc2jCdEbLAgUs7n7N8mz7yldK1Gc7opPY-0GljGB0KNrJHOoa7m8oCiHaC0oweH1OJEaLQRr2Cw2NNjAuLvZFDyeL0pWsa_i5IccJ9GDtsmL5mzdSy4OEZmd3vz_9fREV3ocPOjjnN0-7sk0Tgr0IhojSHfJ4fQUME3-lI5qjHWcLAHmPdzXIOp2e0fm0TISDI8wdShVQm8vD5a4iTSv4zNqmOxLVoszc0kDirOR2nDfjPU7--vnjh9_Acsx6BX6vb00N0Ekd6k3EXH3C5ZzI51oF-67cYWspJbFkbI-YxqhDo4qsu56uSswoAsMrSPFrC5RjZPUJH4QhJD_5TgIPjy-BlZ_QphjRiZqYKtOT8-JL86Ozyc4YmyQ9FUVFJo56l_gdlhThuSct_awuciXVN27m43VhTzRuycLS_pHqddsdFci60c7fGzSlsFhD42QuD2oLbe7tWLx6ywRUcZra33T-2oc8nmY8O77PySa1Wlqky_ySxlCMJ4InH5dHBMeHSKU5REnVvZqBgrDd3Ph-K6SeNrd8lnl0DFSNLnNudtaAbfwtParVexiJuCvBBsRMulOTdTF8UzruCMSZf3tDOd7sX_9rBktbbWr4a_lEQxoZNewUBYjZQU6oWgbc_ymva6bsOLfqFzMEPXut9vpxdXJqXr8aD8PzCpLEic31ZlcDk57MfkYGZRWUW5mNQ_fuJbSkV_Mh53gjWS2wtIvII_twfRtJF1jCZKIsCA4UhWVVw2pZVqQJU5-IZjsU3SqsH7Vb1ggzv1n17QiYb4ABEbyO1AzWyqAcWm5CdfQ1vqaEheYPuiu4aNbjd1nyU3Ze5E0iPH-w-0MPx4yGpwghH46k6jKLwsLwIYuqGyFk1ytqrcYRMShSpyWbT7JkC0onabxs0ugR88TB86ah-d_FAmuzqtsLzHaJIWwXl0tBhCqF0WzCixNYhf6BBuFoL0AH3LD634R4t8FJJj4APOQvWmTp1MuUT_yZ_ovxz79ERSIU7gUAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzE4NzA1OTE1LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=\n",
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: true,
                    },
                  },
                },
              }}
              eventHandlers={
                new Map([
                  [
                    "loaded",
                    function () {
                      console.log("Report loaded");
                    },
                  ],
                  [
                    "rendered",
                    function () {
                      console.log("Report rendered");
                    },
                  ],
                  ["error", handleEmbedError],
                ])
              }
              getEmbeddedComponent={(embeddedReport) => {
                window.Report = embeddedReport;
              }}
              className="h-screen"
            />
          )}
        </div>
      </div>
    </div>
  );
}
