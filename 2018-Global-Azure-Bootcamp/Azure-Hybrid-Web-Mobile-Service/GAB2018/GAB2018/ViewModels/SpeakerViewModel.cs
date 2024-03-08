using GAB2018.Models;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace GAB2018.ViewModels
{
    public class SpeakerViewModel : ViewModelBase
    {
        private string name;
        public string Name
        {
            get => name;
            set => SetProperty(ref name, value);
        }

        private Speaker item = new Speaker();

        public Speaker Item
        {
            get { return item; }
            set { SetProperty(ref item, value); }
        }

        public SpeakerViewModel(INavigationService navigationService)
            : base(navigationService)
        {
            Title = "Speaker";
        }

        public async override void OnNavigatedTo(NavigationParameters parameters)
        {
            var speakerId = parameters.GetValue<string>(Constants.Keys.Speaker);
            Item = await Database.GetSpeaker(speakerId);
            Name = string.Format("{0} {1}", Item.FirstName.ToUpper(), Item.LastName.ToUpper());
        }

        public ICommand OpenBlogCommand
        {
            get => new Command(() => Device.OpenUri(new Uri(Item.Blog)));
        }
        public ICommand OpenTwitterCommand
        {
            get => new Command(() => Device.OpenUri(new Uri(Item.Twitter)));
        }
    }
}
