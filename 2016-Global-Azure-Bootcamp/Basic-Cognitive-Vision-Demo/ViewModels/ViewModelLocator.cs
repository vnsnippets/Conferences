using GalaSoft.MvvmLight.Ioc;
using GalaSoft.MvvmLight.Views;
using Microsoft.Practices.ServiceLocation;
using VisionUWP.Helpers;

namespace VisionUWP.ViewModels
{/// <summary>
 /// This class contains static references to all the view models in the
 /// application and provides an entry point for the bindings.
 /// </summary>
    public class ViewModelLocator
    {
        /// <summary>
        /// Initializes a new instance of the ViewModelLocator class.
        /// </summary>
        public ViewModelLocator()
        {
            ServiceLocator.SetLocatorProvider(() => SimpleIoc.Default);

            ////if (ViewModelBase.IsInDesignModeStatic)
            ////{
            ////    // Create design time view services and models
            ////    SimpleIoc.Default.Register<IDataService, DesignDataService>();
            ////}
            ////else
            ////{
            ////    // Create run time view services and models
            ////    SimpleIoc.Default.Register<IDataService, DataService>();
            ////}

            ServiceLocator.SetLocatorProvider(() => SimpleIoc.Default);

            //Navigation Services
            var navigationService = this.CreateNavigationService();
            SimpleIoc.Default.Register<INavigationService>(() => navigationService);

            SimpleIoc.Default.Register<IDialogService, DialogService>();

            //DataService Registration
            //SimpleIoc.Default.Register<IDataService<Services>, DataService<Services>>();

            // SimpleIoc.Default.Register<IDataService<ClassName>, DataService<ClassName>>();

            //ViewModel Registration
            SimpleIoc.Default.Register<MainViewModel>();
            SimpleIoc.Default.Register<VisionViewModel>();

            //SimpleIoc.Default.Register<ViewModel>();
        }

        private INavigationService CreateNavigationService()
        {
            var navigationService = new NavigationService();
            navigationService.Configure(NavigationKeys.MainPage, typeof(MainPage));
            navigationService.Configure(NavigationKeys.VisionPage, typeof(VisionPage));
            navigationService.Configure(NavigationKeys.SubscriptionPage, typeof(SubscriptionPage));

            return navigationService;
        }


        public MainViewModel MainLocator
        {
            get
            {
                return ServiceLocator.Current.GetInstance<MainViewModel>();
            }
        }

        public VisionViewModel VisionLocator
        {
            get
            {
                return ServiceLocator.Current.GetInstance<VisionViewModel>();
            }
        }

        public static void Cleanup()
        {
            // TODO Clear the ViewModels
        }
    }
}
