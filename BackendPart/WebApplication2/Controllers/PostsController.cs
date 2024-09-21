using Microsoft.AspNetCore.Mvc;
using WebApplication2;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;

[ApiController]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("/api/[controller]/lists")]
    public async Task<IActionResult> GetPosts()
    {
        var posts = await _context.AffanPosts.ToListAsync();
        return Ok(posts);
    }

    [HttpPost("/api/[controller]/add")]
    public async Task<IActionResult> CreatePost([FromBody] Posts post) 
    {
        _context.AffanPosts.Add(post);
        await _context.SaveChangesAsync();
        return Ok(post);
    }

    [HttpPut("/api/[controller]/update")]
    public async Task<IActionResult> UpdatePost([FromBody] Posts post)
    {
        try
        {
            var existingPost = await _context.AffanPosts.FindAsync(post.postId);
            if (existingPost == null)
            {

                return NotFound(new { message = "Post not found" });
            }
            existingPost.title = post.title;
            existingPost.description = post.description;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Post Updated Successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the post", error = ex.Message });
        }

    }

    [HttpDelete("/api/[controller]/{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        try
        {
            var post = await _context.AffanPosts.FindAsync(id);
            if (post == null)
            {

                return NotFound(new { message = "Post not found" });
            }
            _context.AffanPosts.Remove(post);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Post Deleted Successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the post", error = ex.Message });
        }

    }

    [HttpGet("/api/[controller]/postbyUserId")]
    public async Task<IActionResult> GetPostsByUserId(int userId)
    {
        try
        {
            var postexist = await _context.AffanPosts.Where(p => p.userId == userId).ToListAsync();

            if (postexist == null || postexist.Count == 0) 
            {
                return Ok(new { message = "No posts found for this user" });
            }

            return Ok(postexist);
            
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", error = ex.Message });
        }
    }

}
