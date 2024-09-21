using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;
using WebApplication2;
using Microsoft.EntityFrameworkCore;

[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("/api/[controller]/getAll")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.AffanUsers.ToListAsync();
        return Ok(users);
    }

    [HttpPost("/api/[controller]/add")]
    public async Task<IActionResult> CreateUser([FromBody] Users users)
    {
        _context.AffanUsers.Add(users);
        await _context.SaveChangesAsync();
        return Ok(users);
    }

    [HttpPut("/api/[controller]/update")]
    public async Task<IActionResult> UpdateUser([FromBody] Users users)
    {

        try
        {
            var existingUser = await _context.AffanUsers.FindAsync(users.userId);


            if (existingUser == null)
            {
                return NotFound(new { message = "User Not Found" });
            }

            existingUser.userName = users.userName;
            existingUser.password = users.password;


            await _context.SaveChangesAsync();
            return Ok(new { message = "User Updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the user", error = ex.Message });
        }

    }


    [HttpDelete("/api/[controller]/delete/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var users = await _context.AffanUsers.FindAsync(id);


            if (users == null)
            {
                return NotFound(new { message = "User Not Found" });
            }

            var posts = await _context.AffanPosts.Where(p => p.userId == id).ToListAsync();
            if (posts.Any())
            {
                return BadRequest(new { message = "Cannot delete user. User has associated posts." });
            }

            _context.AffanUsers.Remove(users);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully" });
        }


        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the user", error = ex.Message });
        }
    }


    [HttpGet("/api/[controller]/getSingle")]
    public async Task<IActionResult> GetSingle([FromQuery] string userName, string password)
    {
        try
        {
            // Fetch the user based on userName (assuming it's not the primary key)
            var user = await _context.AffanUsers.FirstOrDefaultAsync(u => u.userName == userName.Trim());

            if (user == null)
            {
                return Ok(new { message = "User not found" });
            }

            // Compare passwords (ideally, you should use hashed passwords and compare hashes)
            if (user.password == password) // Replace this with a proper password hash comparison
            {
                return Ok(new { message = "User login successful",
                    userId=user.userId,
                    userName = user.userName

                });
            }
            else
            {
                return Unauthorized(new { message = "Incorrect password" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred", error = ex.Message });
        }
    }

}
