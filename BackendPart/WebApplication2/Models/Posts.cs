using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Models
{
    public class Posts
    {
        [Key]
        public int postId { get; set; }
        [ForeignKey("Users")]
        public int userId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string createdOn { get; set; }
    }
}
