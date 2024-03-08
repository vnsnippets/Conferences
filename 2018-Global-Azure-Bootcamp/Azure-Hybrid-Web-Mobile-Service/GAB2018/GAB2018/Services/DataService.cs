using GAB2018.Models;
using GAB2018.Services;
using Microsoft.WindowsAzure.MobileServices;
using Microsoft.WindowsAzure.MobileServices.SQLiteStore;
using Microsoft.WindowsAzure.MobileServices.Sync;
using Plugin.Connectivity;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

[assembly: Dependency(typeof(DataService))]
namespace GAB2018.Services
{
    public class DataService
    {
        public MobileServiceClient Client { get; set; } = null;
        IMobileServiceSyncTable<Session> SessionsTable;
        IMobileServiceSyncTable<Speaker> SpeakersTable;

        public async Task Initialize()
        {
            try
            {
                if (Client?.SyncContext?.IsInitialized ?? false)
                    return;

                //Creating client
                Client = new MobileServiceClient(Constants.MobileServiceURL);

                //Setup local SQLite storage and Initialize table
                var SQLPath = Path.Combine(MobileServiceClient.DefaultDatabasePath, Constants.SQLiteStore);
                var Store = new MobileServiceSQLiteStore(SQLPath);
                Store.DefineTable<Session>();
                Store.DefineTable<Speaker>();
                await Client.SyncContext.InitializeAsync(Store, new MobileServiceSyncHandler());

                //Get the sync table that will call out to Azure
                SessionsTable = Client.GetSyncTable<Session>();
                SpeakersTable = Client.GetSyncTable<Speaker>();
                await SyncItems();
            }
            catch (Exception E)
            {
                Debug.WriteLine("ERROR. Data Service failed to initialise. " + E.Message);
            }
        }

        public async Task<IEnumerable<Session>> GetAllSessionsAsync(bool ForceSync = false)
        {
            await Initialize();
            await SyncItems();

            return await SessionsTable.ToEnumerableAsync();
        }

        public async Task SyncItems()
        {
            try
            {
                if (CrossConnectivity.IsSupported && !CrossConnectivity.Current.IsConnected)
                    return;

                await SessionsTable.PullAsync("Sessions", SessionsTable.CreateQuery());
                await SpeakersTable.PullAsync("Speakers", SpeakersTable.CreateQuery());
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Unable to sync drugs. Shifted to Offline data. Error: " + ex.Message);
            }
        }

        public async Task<Speaker> GetSpeaker(string id)
        {
            var speaker = await SpeakersTable.LookupAsync(id);
            return speaker;
        }
    }

    //public async Task<IEnumerable<Session>> GetAllSessionsAsync()
    //{
    //    var sessions = new List<Session>();

    //    for (int i = 0; i < 10; i++)
    //    {
    //        sessions.Add(new Session
    //        {
    //            Title = "SESSION" + i,
    //            Start = DateTime.Now.TimeOfDay,
    //            End = DateTime.Now.TimeOfDay,
    //            Date = DateTime.Today, SpeakerId = i.ToString()
    //        });
    //    }

    //    return sessions;
    //}

    //public Speaker GetSpeaker(string id)
    //{
    //    var speaker = new Speaker
    //    {
    //        FirstName = "John",
    //        LastName = "Smith",
    //        Biography = "Lorem ipsum dolor sit amet, ius suas labore salutatus ei. Ne clita utroque lobortis vis, per partem accusam eu. Ex ius erant tacimates, vix ea quem nominavi, ea cum assentior voluptatum.",
    //        Blog = "http://google.com",
    //        Twitter = "http://google.com",
    //        Title = "Software Engineer"
    //    };

    //    return speaker;
    //}
}
