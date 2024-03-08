using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Views;
using VisionUWP.Helpers;

namespace VisionUWP.ViewModels
{
    public class MainViewModel : ViewModelBase
    {
        private INavigationService Navigator;

        public MainViewModel(INavigationService navigationService)
        {
            Navigator = navigationService;
        }

        /// <summary>
        /// The <see cref="VisionKey" /> property's name.
        /// </summary>
        public const string VisionKeyPropertyName = "VisionKey";

        private string _visionKey = "";

        /// <summary>
        /// Sets and gets the Date property.
        /// Changes to that property's value raise the PropertyChanged event. 
        /// </summary>
        public string VisionKey
        {
            get
            {
                return _visionKey;
            }

            set
            {
                if (_visionKey == value)
                {
                    return;
                }

                _visionKey = value;
                RaisePropertyChanged(VisionKeyPropertyName);
            }
        }

        private RelayCommand _loadVisionKey;

        /// <summary>
        /// Gets the LoadVisionKey.
        /// </summary>
        public RelayCommand LoadVisionKey
        {
            get
            {
                return _loadVisionKey
                    ?? (_loadVisionKey = new RelayCommand(
                    () =>
                    {
                        Windows.Storage.ApplicationDataContainer LocalData = Windows.Storage.ApplicationData.Current.LocalSettings;
                        string Buffer = (string) LocalData.Values["VisionKey"];

                        if (string.IsNullOrEmpty(Buffer))
                        {
                            Navigator.NavigateTo(NavigationKeys.SubscriptionPage);
                        }

                        else
                        {
                            VisionKey = Buffer;
                            Navigator.NavigateTo(NavigationKeys.VisionPage);
                        }

                    }));
            }
        }
        private RelayCommand _saveVisionKey;

        /// <summary>
        /// Gets the SaveVisionKey.
        /// </summary>
        public RelayCommand SaveVisionKey
        {
            get
            {
                return _saveVisionKey
                    ?? (_saveVisionKey = new RelayCommand(
                    () =>
                    {
                        Windows.Storage.ApplicationDataContainer LocalData = Windows.Storage.ApplicationData.Current.LocalSettings;
                        LocalData.Values["VisionKey"] = VisionKey;

                        Constants.VisionKey = VisionKey;
                        Navigator.NavigateTo(NavigationKeys.VisionPage);
                    }));
            }
        }
    }
}