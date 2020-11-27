using Microsoft.EntityFrameworkCore.Migrations;

namespace Engrisk.Migrations
{
    public partial class update_part_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Quiz",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuizPhoto",
                table: "Quiz",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Quiz");

            migrationBuilder.DropColumn(
                name: "QuizPhoto",
                table: "Quiz");
        }
    }
}
