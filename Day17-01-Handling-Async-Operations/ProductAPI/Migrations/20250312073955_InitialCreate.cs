using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProductAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Product 1", 10m },
                    { 2, "Product 2", 20m },
                    { 3, "Product 3", 30m },
                    { 4, "Product 4", 40m },
                    { 5, "Product 5", 50m },
                    { 6, "Product 6", 60m },
                    { 7, "Product 7", 70m },
                    { 8, "Product 8", 80m },
                    { 9, "Product 9", 90m },
                    { 10, "Product 10", 100m },
                    { 11, "Product 11", 110m },
                    { 12, "Product 12", 120m },
                    { 13, "Product 13", 130m },
                    { 14, "Product 14", 140m },
                    { 15, "Product 15", 150m },
                    { 16, "Product 16", 160m },
                    { 17, "Product 17", 170m },
                    { 18, "Product 18", 180m },
                    { 19, "Product 19", 190m },
                    { 20, "Product 20", 200m },
                    { 21, "Product 21", 210m },
                    { 22, "Product 22", 220m },
                    { 23, "Product 23", 230m },
                    { 24, "Product 24", 240m },
                    { 25, "Product 25", 250m },
                    { 26, "Product 26", 260m },
                    { 27, "Product 27", 270m },
                    { 28, "Product 28", 280m },
                    { 29, "Product 29", 290m },
                    { 30, "Product 30", 300m },
                    { 31, "Product 31", 310m },
                    { 32, "Product 32", 320m },
                    { 33, "Product 33", 330m },
                    { 34, "Product 34", 340m },
                    { 35, "Product 35", 350m },
                    { 36, "Product 36", 360m },
                    { 37, "Product 37", 370m },
                    { 38, "Product 38", 380m },
                    { 39, "Product 39", 390m },
                    { 40, "Product 40", 400m },
                    { 41, "Product 41", 410m },
                    { 42, "Product 42", 420m },
                    { 43, "Product 43", 430m },
                    { 44, "Product 44", 440m },
                    { 45, "Product 45", 450m },
                    { 46, "Product 46", 460m },
                    { 47, "Product 47", 470m },
                    { 48, "Product 48", 480m },
                    { 49, "Product 49", 490m },
                    { 50, "Product 50", 500m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
