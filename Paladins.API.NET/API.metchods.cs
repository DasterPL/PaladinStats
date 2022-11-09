using Newtonsoft.Json.Linq;

namespace PaladinsDotNET
{
    public partial class API
    {
        public JToken GetServerStatus()
        {
            return this.MakeRequest(this.BuildUrl("gethirezserverstatus"));
        }

        public JToken GetPatchInfo()
        {
            return this.MakeRequest(this.BuildUrl("getpatchinfo"));
        }

        public JToken GetTopMatches()
        {
            return this.MakeRequest(this.BuildUrl("gettopmatches"));
        }

        public JToken GetRankedLeaderboard(int tier, int season, int queue)
        {
            return this.MakeRequest(this.BuildUrl("getleagueleaderboard", null, -1, -1, -1, queue, tier, season));
        }

        public JToken GetRankedSeasons(int queue)
        {
            return this.MakeRequest(this.BuildUrl("getleagueseasons", null, -1, -1, -1, queue));
        }

        public JToken GetMatchIdsByQueue<T>(string hour, T date, int queue = 424)
        {
            string url = $"{Variables.API_URL}/getmatchiidsbyqueueJson/{this.DevId}/" + this.GetSignature(this.DevId + "getmatchidsbyqueue" + this.AuthKey + this.GetTimestamp()) + $"/{this.GetSession()}/{this.GetTimestamp()}/{queue}/{date}/{hour}";

            return this.MakeRequest(url);
        }

        public JToken GetChampions()
        {
            return this.MakeRequest(this.BuildUrl("getchampions", null, this.LanguageId));
        }

        public JToken GetChampionCards(int championId)
        {
            return this.MakeRequest(this.BuildUrl("getchampioncards", null, this.LanguageId, -1, championId));
        }

        public JToken GetChampionSkins(int championId)
        {
            return this.MakeRequest(this.BuildUrl("getchampionskins", null, this.LanguageId, -1, championId));
        }

        public JToken GetItems()
        {
            return this.MakeRequest(this.BuildUrl("getitems", null, this.LanguageId));
        }

        public JToken GetPlayer(string name)
        {
            return this.MakeRequest(this.BuildUrl("getplayer", name));
        }

        public JToken GeyPlayerIdByName(string name)
        {
            return this.MakeRequest(this.BuildUrl("getplayeridbyname", name));
        }

        public JToken GetPlayerIdByPortalUserId(string name, int platform)
        {
            return this.MakeRequest(this.BuildUrl("getplayeridbyportaluserid", name, -1, -1, -1, -1, -1, -1, platform));
        }

        public JToken GetPlayerIdsByGamertag(string name, int platform)
        {
            return this.MakeRequest(this.BuildUrl("getplayeridsbygamertag", name, -1, -1, -1, -1, -1, -1, platform));
        }

        public JToken GetPlayerIdInfoForXboxAndSwitch(string name)
        {
            return this.MakeRequest(this.BuildUrl("getplayeridinfoforxboxandswitch", name));
        }

        public JToken GetPlayerFriends(string playerId)
        {
            return this.MakeRequest(this.BuildUrl("getfriends", playerId));
        }

        public JToken GetPlayerChampionRanks(string playerId)
        {
            return this.MakeRequest(this.BuildUrl("getchampionranks", playerId));
        }

        public JToken GetPlayerLoadouts(string playerId)
        {
            return this.MakeRequest(this.BuildUrl("getplayerloadouts", playerId, this.LanguageId));
        }

        public JToken GetPlayerStatus(string playerId)
        {
            return this.MakeRequest(this.BuildUrl("getplayerstatus", playerId));
        }

        public JToken GetPlayerMatchHistory(string playerId)
        {
            return this.MakeRequest(this.BuildUrl("getmatchhistory", playerId));
        }

        public JToken GetPlayerQueueStats(string playerId, int queue)
        {
            return this.MakeRequest(this.BuildUrl("getqueuestats", playerId, -1, -1, -1, queue));
        }

        public JToken GetMatchModeDetails(int matchId)
        {
            return this.MakeRequest(this.BuildUrl("getmodedetails", null, -1, matchId));
        }

        public JToken GetMatchDetails(int matchId)
        {
            return this.MakeRequest(this.BuildUrl("getmatchdetails", null, -1, matchId));
        }

        public JToken GetActiveMatchDetails(int matchId)
        {
            return this.MakeRequest(this.BuildUrl("getmatchplayerdetails", null, -1, matchId));
        }

        public JToken GetDataUsage()
        {
            return this.MakeRequest(this.BuildUrl("getdataused"));
        }
    }
}
