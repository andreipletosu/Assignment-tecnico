using System;
using System.Diagnostics.Eventing.Reader;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using AngularAuthAPI.Context;
using AngularAuthAPI.Helpers;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AngularAuthAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class UserController : ControllerBase
	{
		private readonly AppDbContext _authContext;
		public UserController(AppDbContext appDbContext)
		{
			_authContext = appDbContext;
		}

		[HttpPost("authenticate")]
		public async Task<IActionResult> Authenticate([FromBody] User userObj)
		{
			if (userObj == null)
				return BadRequest();

			var user = await _authContext.Users
				.FirstOrDefaultAsync(x => x.Username == userObj.Username);

			if (user == null)
				return NotFound(new { Message = "User Not Found!" });

			if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
			{
				return BadRequest(new { Message = "Password is incorrect" });
			}

			user.Token = CreateJWT(user);

			return Ok(new
			{
                Token = user.Token,
				Message = "Login Success!"
            });

		}

		[HttpPost("register")]
		public async Task<IActionResult> RegisterUser([FromBody] User userObj)
		{
			if (userObj == null)
				return BadRequest();

			// Check username
			if (await CheckUsernameExistAsync(userObj.Username))
				return BadRequest(new { Message = "Username already exists!" });

			// Check email
			if (await CheckEmailExistAsync(userObj.Email))
				return BadRequest(new { Message = "Email already exists!" });


			// Check password strength
			var pass = CheckPasswordStrength(userObj.Password);
			if (!string.IsNullOrEmpty(pass))
				return BadRequest(new { Message = pass });



			userObj.Password = PasswordHasher.HashPassword(userObj.Password);
			userObj.Role = "User";
			userObj.Token = "";
			userObj.Favourites = "";
			await _authContext.Users.AddAsync(userObj);
			await _authContext.SaveChangesAsync();

			return Ok(new
			{
				Message = "User Registered!"
			});
		}

		[Authorize]
		[HttpPut("favourites")]

		public async Task<IActionResult> AddToFavorite(string userId , string favouriteId)
		{
			var user = await _authContext.Users.FindAsync(int.Parse(userId));

			if (user == null)
				return BadRequest();
			string[] aux = user.Favourites.Split(',');
			
			for(int i = 0; i < aux.Length; i++)
			{
				if (favouriteId == aux[i])
					return BadRequest(new { Message = "Already in Favourites" });

            }

			if (user.Favourites == "")
				user.Favourites = favouriteId;
			else
				user.Favourites = user.Favourites + ',' + favouriteId;

			await _authContext.SaveChangesAsync();
			return Ok(new{
				Message = "Added to favourite!"
			});
		}
		

        private async Task<bool> CheckUsernameExistAsync(string username)
		{
			return await _authContext.Users.AnyAsync(x => x.Username == username);
		}

		private async Task<bool> CheckEmailExistAsync(string email)
		{
			return await _authContext.Users.AnyAsync(x => x.Email == email);
		}

		private string CheckPasswordStrength(string password)
		{
			StringBuilder sb = new StringBuilder();
			if (password.Length < 8)

				sb.Append("Minimum Password Length is 8 charaters" + Environment.NewLine);

			if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
				&& Regex.IsMatch(password, "[0-9]")))
				sb.Append("Password should contain characters a-z A-Z 0-9" + Environment.NewLine);

			if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
				sb.Append("Password should contain a spacial character" + Environment.NewLine);

			return sb.ToString();
		}

		private string CreateJWT(User user)
		{
			var jwtTokenHandler = new JwtSecurityTokenHandler();

			var key = Encoding.ASCII.GetBytes("secretsecretkey.....");
			var identity = new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.Role, user.Role),
				new Claim(ClaimTypes.Name, user.Username),
				new Claim("user_id" , user.Id.ToString())
			});

			var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = identity,
				Expires = DateTime.Now.AddDays(1),
				SigningCredentials = credentials
			};
			var token = jwtTokenHandler.CreateToken(tokenDescriptor);

			return jwtTokenHandler.WriteToken(token);
		}

		[Authorize]
		[HttpGet]
		public async Task<ActionResult<User>> GetAllUsers()
		{
			return Ok(await _authContext.Users.ToListAsync());
		}

        [Authorize]
        [HttpGet("get_favourites")]
        public async Task<ActionResult<string>> GetFavourites(string userId)
        {
			return Ok(await _authContext.Users.FindAsync(int.Parse(userId)));
        }
    }
}

