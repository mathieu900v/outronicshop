using System;

namespace OutronicShop.Backend.Database.Context
{
    public class DatabaseConfiguration
    {
        public string Ip { get; }
        public string Username { get; }
        public string Password { get; }
        public string DBName { get; }
        public ushort Port { get; }
        public override string ToString() => $"Host={Ip};Port={Port.ToString()};Database={DBName};Username={Username};Password={Password}";

        public DatabaseConfiguration()
        {
            Ip = Environment.GetEnvironmentVariable("WEB_DATABASE_IP") ?? "127.0.0.1";
            Username = Environment.GetEnvironmentVariable("WEB_DATABASE_USER") ?? "postgres";
            Password = Environment.GetEnvironmentVariable("WEB_DATABASE_PASSWORD") ?? "postgres";
            DBName = Environment.GetEnvironmentVariable("WEB_DATABASE_NAME") ?? "postgres";
            if (!ushort.TryParse(Environment.GetEnvironmentVariable("WEB_DATABASE_PORT") ?? "5432", out ushort port))
            {
                port = 5432;
            }

            Port = port;
        }
    }
}