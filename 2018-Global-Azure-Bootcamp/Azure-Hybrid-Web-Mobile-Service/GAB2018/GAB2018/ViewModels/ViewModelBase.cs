using GAB2018.Services;
using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace GAB2018.ViewModels
{
    public class ViewModelBase : BindableBase, INavigationAware, IDestructible
    {
        protected INavigationService NavigationService { get; private set; }
        
        public ViewModelBase(INavigationService navigationService)
        {
            NavigationService = navigationService;
            Database = DependencyService.Get<DataService>();
        }

        public virtual void OnNavigatedFrom(NavigationParameters parameters)
        {
            
        }

        public virtual void OnNavigatedTo(NavigationParameters parameters)
        {
            
        }

        public virtual void OnNavigatingTo(NavigationParameters parameters)
        {
            
        }

        public virtual void Destroy()
        {
            
        }


        #region PROPERTIES
        public DataService Database;

        private string _title;
        public string Title
        {
            get { return _title; }
            set { SetProperty(ref _title, value); }
        }

        bool isBusy = false;
        public bool IsBusy
        {
            get { return isBusy; }
            set { SetProperty(ref isBusy, value); }
        }
        #endregion

        #region COMMANDS
        public ICommand BackCommand
        {
            get
            {
                return new Command(async () =>
                {
                    IsBusy = true;
                    await NavigationService.GoBackAsync();
                    IsBusy = false;
                });
            }
        }
        #endregion
    }
}
