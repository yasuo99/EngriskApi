using Microsoft.EntityFrameworkCore.Migrations;

namespace Engrisk.Migrations
{
    public partial class UpdateQuestionEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Questions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Questions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Questions");
        }
    }
}
