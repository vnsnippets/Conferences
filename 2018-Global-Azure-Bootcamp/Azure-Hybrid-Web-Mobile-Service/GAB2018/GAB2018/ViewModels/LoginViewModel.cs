using Plugin.Settings;
using Plugin.Settings.Abstractions;
using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace GAB2018.ViewModels
{
    public class LoginViewModel : ViewModelBase
    {
        private static ISettings Settings => CrossSettings.Current;

        private static bool FirstRun
        {
            get => Settings.GetValueOrDefault(nameof(FirstRun), true);
            set => Settings.AddOrUpdateValue(nameof(FirstRun), value);
        }

        public LoginViewModel(INavigationService navigationService) 
            : base (navigationService)
        {
            Title = "Welcome";
            FirstRun = true;
        }

        public ICommand LoadAgendaCommand
        {
            get => new Command(async() => await NavigationService.NavigateAsync(Constants.Pages.Agenda));
        }
    }
}
