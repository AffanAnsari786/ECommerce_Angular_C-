using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models
{
    public class Users
    {
        [Key]
        public int userId { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
    }
}
