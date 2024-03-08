using GAB2018.Models;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace GAB2018.ViewModels
{
    public class AgendaViewModel : ViewModelBase
    {
        public AgendaViewModel(INavigationService navigationService)
            : base(navigationService)
        {
            Title = "Agenda";
        }

        private Session selectedItem;

        public Session SelectedItem
        {
            get { return selectedItem; }
            set { SetProperty(ref selectedItem, value); }
        }

        private ObservableCollection<Session> items = new ObservableCollection<Session>();

        public ObservableCollection<Session> Items
        {
            get => items;
            set => SetProperty(ref items, value);
        }

        public ICommand LoadItemsCommand
        {
            get
            {
                return new Command(async () =>
                {
                    if (IsBusy)
                        return;

                    IsBusy = true;

                    try
                    {
                        var items = await Database.GetAllSessionsAsync();

                        Items.Clear();
                        foreach (var item in items) Items.Add(item);

                        //SHOW ERROR MESSAGE
                        if (Items.Count == 0)
                        {

                        }
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine(ex);
                    }
                    finally
                    {
                        IsBusy = false;
                    }
                });
            }
        }

        public ICommand OpenItemCommand
        {
            get
            {
                return new Command(async () =>
                {
                    if (SelectedItem == null) return;

                    var Parameters = new NavigationParameters
                    {
                        { Constants.Keys.Speaker, SelectedItem.SpeakerId }
                    };
                    
                    SelectedItem = null;
                    await NavigationService.NavigateAsync(Constants.Pages.Speaker, Parameters);
                });
            }
        }
    }
}
