using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace PaladinsDotNET
{
    public partial class API
    {
        private string DevId;
        private string AuthKey;
        private int LanguageId;
        private Cache cache;
        private HttpClient client;

        public API(string id, string key)
        {
            this.DevId = id;
            this.AuthKey = key;
            this.LanguageId = 12;
            this.client = new HttpClient();
            this.cache = new Cache();
        }

        private string GetSession()
        {
            return this.cache.Remember(Variables.CACHE_SESSION_ID, 12, GetSessionFromAPI).ToString();
        }

        private string GetSessionFromAPI()
        {
            string url = $"{Variables.API_URL}/createsessionjson/{this.DevId}/{this.GetSignature(this.DevId + "createsession" + this.AuthKey + this.GetTimestamp())}/{this.GetTimestamp()}";

            JToken resp = this.MakeRequest(url);

            if (resp.SelectToken("ret_msg").ToString() != "Approved" || resp.SelectToken("session_id") == null)
            {
                throw new System.Exception(resp.SelectToken("ret_msg").ToString());
            }
            else
            {
                return resp.SelectToken("session_id").ToString();
            }
        }

        private string GetTimestamp()
        {
            return (System.DateTime.UtcNow.ToString("yyyyMMddHHmm") + "00");
        }

        private string GetSignature(string input)
        {
            return MD5.Create(input);
        }

        private string BuildUrl(string method,
                                string player = null,
                                int language = -1,
                                int matchId = -1,
                                int champId = -1,
                                int queue = -1,
                                int tier = -1,
                                int season = -1,
                                int platform = -1)
        {
            string baseUrl = $"{Variables.API_URL}/{method}Json/{this.DevId}/{this.GetSignature(this.DevId + method + this.AuthKey + this.GetTimestamp())}/{this.GetSession()}/{this.GetTimestamp()}";

            if (platform > -1)
            {
                baseUrl += $"/{platform}";
            }

            if (player != null)
            {
                baseUrl += $"/{player}";
            }

            if (champId > -1)
            {
                baseUrl += $"/{champId}";
            }

            if (language > -1)
            {
                baseUrl += $"/{language}";
            }

            if (matchId > -1)
            {
                baseUrl += $"/{matchId}";
            }

            if (queue > -1)
            {
                baseUrl += $"/{queue}";
            }

            if (tier > -1)
            {
                baseUrl += $"/{tier}";
            }


            if (season > -1)
            {
                baseUrl += $"/{season}";
            }
            return baseUrl;
        }

        private JToken MakeRequest(string url)
        {
            var response = this.client.GetStringAsync(url).Result;

            return JValue.Parse(response);
        }
    }
}
