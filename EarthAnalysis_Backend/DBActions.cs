using System.Data;
using System.Collections.Generic;
using System.Data.SQLite;
using EarthAnalysis_Backend.Models;
using Microsoft.Extensions.Configuration;
using Dapper;

namespace EarthAnalysis_Backend
{
    public static class DBActions
    {
        private static string connectionString = "Data Source=.\\Databases\\StationLocation.db;Version = 3";
        public static IEnumerable<AtomicStation> GetParticularCountry(string PartCountry)
        {
            string sqlRequest = "SELECT Country FROM Stations WHERE Country=" + PartCountry + ";";
            using (IDbConnection cnn = new SQLiteConnection(connectionString))
            {
                IEnumerable<AtomicStation> outputData = cnn.Query<AtomicStation>(sqlRequest, new DynamicParameters());
                return outputData;
            }
        }
    }
}
