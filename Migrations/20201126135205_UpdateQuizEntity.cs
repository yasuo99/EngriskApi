using Microsoft.EntityFrameworkCore.Migrations;

namespace Engrisk.Migrations
{
    public partial class UpdateQuizEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "RequireLogin",
                table: "Quiz",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequireLogin",
                table: "Quiz");
        }
    }
}
