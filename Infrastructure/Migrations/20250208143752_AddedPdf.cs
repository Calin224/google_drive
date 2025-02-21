using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedPdf : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Items_ItemId",
                table: "Photo");

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "Photo",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PdfId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Pdf",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pdf", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_PdfId",
                table: "Items",
                column: "PdfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Pdf_PdfId",
                table: "Items",
                column: "PdfId",
                principalTable: "Pdf",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Items_ItemId",
                table: "Photo",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Pdf_PdfId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Items_ItemId",
                table: "Photo");

            migrationBuilder.DropTable(
                name: "Pdf");

            migrationBuilder.DropIndex(
                name: "IX_Items_PdfId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "PdfId",
                table: "Items");

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "Photo",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Items_ItemId",
                table: "Photo",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
