using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedFolders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_AspNetUsers_AppUserId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_AppUserId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "FolderId",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Folder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Folder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Folder_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_FolderId",
                table: "Items",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Folder_AppUserId",
                table: "Folder",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Folder_FolderId",
                table: "Items",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Folder_FolderId",
                table: "Items");

            migrationBuilder.DropTable(
                name: "Folder");

            migrationBuilder.DropIndex(
                name: "IX_Items_FolderId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Items");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Items",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Items_AppUserId",
                table: "Items",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_AspNetUsers_AppUserId",
                table: "Items",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
