using Prism;
using Prism.Ioc;
using GAB2018.ViewModels;
using GAB2018.Views;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Prism.Unity;
using Plugin.Settings.Abstractions;
using Plugin.Settings;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace GAB2018
{
    public partial class App : PrismApplication
    {
        /* 
         * The Xamarin Forms XAML Previewer in Visual Studio uses System.Activator.CreateInstance.
         * This imposes a limitation in which the App class must have a default constructor. 
         * App(IPlatformInitializer initializer = null) cannot be handled by the Activator.
         */
        private static ISettings Settings => CrossSettings.Current;
        private static bool FirstRun
        {
            get => Settings.GetValueOrDefault(nameof(FirstRun), true);
            set => Settings.AddOrUpdateValue(nameof(FirstRun), value);
        }

        public App() : this(null) { }

        public App(IPlatformInitializer initializer) : base(initializer) { }

        protected override async void OnInitialized()
        {
            InitializeComponent();

            if (FirstRun)
                await NavigationService.NavigateAsync("NavigationPage/Login");
            else
                await NavigationService.NavigateAsync("NavigationPage/Agenda");
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterForNavigation<NavigationPage>();
            containerRegistry.RegisterForNavigation<Login>();
            containerRegistry.RegisterForNavigation<Agenda>();
            containerRegistry.RegisterForNavigation<Speaker>();
        }
    }
}
