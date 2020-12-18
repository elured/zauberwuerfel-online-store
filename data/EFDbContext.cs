using RubiksCubeStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace RubiksCubeStore.Domain.Concrete
{
    public class EFDbContext : DbContext
    {
        public EFDbContext()
        {
            Database.SetInitializer<EFDbContext>(new EFDbInitializer());
        }

        public DbSet<Cube> Cubes { get; set; }
    }

    public class EFDbInitializer : DropCreateDatabaseAlways<EFDbContext>//CreateDatabaseIfNotExists
    {
        string pathToImagesOrder = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/");
        protected override void Seed(EFDbContext context)
        {
            List<Cube> cubes = new List<Cube>
            {
                new Cube{Name ="Original Rubik's Speedcube", ImageData = getImageAsByteArray(@"Images\ORIGINAL_RUBIKS_SPEED_CUBE.jpg"), ImageMimeType = "image/jpg", Description = "Endlich ein richtiger Speedcube von Original Rubik's! Fürs Speedcubing optimierter Mechanismus. Sehr smoothe Drehbewegungen. Robust und klassisch im Design. Die besten Köpfe von Rubik's und Gan (renommierter Speedcubing-Ausrüster seit 2014) haben sich zusammengetan, um diesen Meilenstein in der Cubing-Geschichte ins Leben zu rufen. Ambitionierte Speedcuber werden zustimmen, was der Weltklasse-Speedcuber Kevin Gerhardt zu diesem Produkt sagt:  \"Im Gegensatz zu anderen Rubik's Modellen kann der RSC mit den neuesten Speedcubes mithalten. Er vermittelt ein fantastisches Gefühl und lässt sich tadellos drehen. Er hat einen geschmeidigen Look und fühlt sich gut in der Hand an. Wenn du das Drehgefühl magst, hat er sogar das Potenzial dein neuer Main Cube zu werden!\"", Category = "Rubik's Cube", Price= 19.99M},//!!!
                new Cube{Name ="Speed Megaminx Cheeky Sheep", ImageData = getImageAsByteArray(@"Images\SPEED_MEGAMINX_CHEEKY_SHEEP.jpg"), ImageMimeType = "image/jpg", Description = "Beliebter Speed Megaminx für Anfänger und Fortgeschrittene. Fürs Speedcubing optimierte Bauweise. Mit Cornercutting. Der Speedcubing-Megaminx von Cubikon Cheeky Sheep in der neuen Ausführung (Modell 2019). Für Anfänger und für Fortgeschrittene geeignet. Erhöhte Bausteine (konvex) sorgen für besseren Grip, leichte Drehbarkeit, weniger Lockups (Verkanten). Ein optimaler Megaminx Cube für Einsteiger, die ein gutes Puzzle zum günstigen Preis suchen.", Category = "Variations", Price= 9.95M},//!!!
                new Cube{Name ="Speed Pyraminx Cheeky Sheep", ImageData = getImageAsByteArray(@"Images\SPEED_PYRAMINX_CHEEKY_SHEEP.jpg"), ImageMimeType = "image/jpg", Description = "Beliebter Speed Pyraminx für Anfänger und Fortgeschrittene. Fürs Speedcubing optimierte Bauweise. Mit Cornercutting. Leichte Drehbarkeit, Weniger Lockups (Verkanten), sehr gutes Cornercutting. Ein optimaler Pyraminx Cube für Einsteiger, die eine gute Dreh-Pyramide zum günstigen Preis suchen.", Category = "Variations", Price= 9.95M},//!!!
                new Cube{Name ="Mirror Cube Cheeky Sheep", ImageData = getImageAsByteArray(@"Images\MIRROR_CUBE_CHEEKY_SHEEP.jpg"), ImageMimeType = "image/jpg", Description = "Faszinierender Zauberwürfel, der nach Formen sortiert wird. Schöne neue Herausforderung für all diejenigen, denen der normale 3x3 Würfel zu langweilig ist oder einfach mal etwas Neues ausprobieren möchten.", Category = "Rubik's Cube", Price= 5.99M},//!!!
                new Cube{Name ="Original Rubik's Snake", ImageData = getImageAsByteArray(@"Images\original_rubiks_snake.jpg"), ImageMimeType = "image/jpg", Description = "Die Original Rubik's Snake von Jumbo Spiele ist eine verdrehte Denksport-Aufgabe, die Tausende von Formen annehmen kann. lange Zeit nicht erhältlich gewesen - jetzt wieder da von Jumbo Spiele! Farbplättchen sind schön eingearbeitet und nicht ablösbar Robuste und schöne Ausführung. Auch unter der Bezeichnung \"Rubik's Twist\" bekannt. Die neue Rubik's Snake ist ein netter Zeitvertreib für Zwischendurch.", Category = "Sonstige", Price= 14.95M},
                new Cube{Name ="Original Rubik's Touch Cube", ImageData = getImageAsByteArray(@"Images\original_rubiks_touch_cube.jpg"), ImageMimeType = "image/jpg", Description = "Fühlbare Muster auf den Farben - 3x3 Zauberwürfel zum Blindlösen! Besonderer Rubiks Cube - Harte Farblättchen mit erhabenen Details - zum Tasten. Der Klassiker in einer speziellen Auführung: Dies ist der Rubikwürfel für Blinde und zum Üben vom \"Blinden Lösen\" (sog. Blind Solves). Der Zauberwürfel ist das meistverkaufte Knobelspiel weltweit. Geniale Spielidee, der weitere faszinierende und sogar schwierigere Varianten folgten. Etliche davon finden Sie hier bei Cubikon im Angebot. 43 Trillionen(!) Kombinationen möglich. Dieser Würfel macht süchtig und trainiert die grauen Zellen. Ein Original von Rubik's. Neues, innovatives Design: Ermöglicht das Lösen mit verbundenen Augen(sog.Blind Solves). In schöner Geschenk - Verpackung. Inkl.Standfuß zur dekorativen Präsentation des Zauberwürfels. Inkl.Cubikon - Tasche zum Schutz gegen Schmutz und Staub", Category = "Sonstige", Price= 24.95M},
                new Cube{Name ="5 Stück Zauberwürfel in der Überraschungs-Kiste", ImageData = getImageAsByteArray(@"Images\5_stück_zauberwürfel_in_der_überraschungs-kiste.jpg"), ImageMimeType = "image/jpg", Description = "Jede Kiste ist eine Überraschung und enthält 5 verschiedene Spiele. Lass dich überraschen! Der gesamte Warenwert übersteigt den Kaufpreis erheblich. Fotos beispielhaft - z.B. Pyraminx, Megaminx, 2x2, 3x3, 4x4 Cube... Jede Kiste ist eine Überraschung und enthält 5 verschiedene Spiele. WICHTIGE INFORMATION: pro Box sind alle Artikel unterschiedlich -bei Bestellung mehrerer Boxen können doppelte Produkte enthalten sein. Ideal um verschiedene Zauberwürfel-Varianten kennen zu lernen. Thema ZAUBERWÜRFEL - alle Spiele sind Drehpuzzles und ähnlich zu lösen wie der bekannte Zauberwürfel", Category = "Sonstige", Price= 14.99M},
                new Cube{Name ="Speed Cube Gan356 Air Master", ImageData = getImageAsByteArray(@"Images\SPEED_CUBE_GAN356_AIR_MASTER.jpg"), ImageMimeType = "image/jpg", Description = "Ausgereifter Speedcube von Gans-Puzzle. Fürs Speedcubing optimierter Mechanismus. Sehr smoothe Drehbewegungen. Der GAN356AIR MASTER verfügt über ein ausgeklügeltes System, das ein sehr smoothes Drehgefühl vermittelt. Dieser Würfel ist ein Profi-Modell für ambitionierte Speedcuber. Im Lieferumfang enthalten sind austauschbare Federn um den Würfel noch individueller zu optimieren. Sehr leichtgängiger Würfel mit kaum Drehwiderstand austauschbare Federn (im Lieferumfang) für individuelle Optimierung, Starkes Cornercutting, Popresistent, Würfel der Profi-Klasse, robuste Sticker, teilweise Neon-Farben, Einstellwerkzeug enthalten", Category = "Rubik's Cube", Price= 34.95M},
                new Cube{Name ="Flower Cube Lucky Lion", ImageData = getImageAsByteArray(@"Images\FLOWER_CUBE_LUCKY_LION.jpg"), ImageMimeType = "image/jpg", Description = "Sehr beliebte Zauberwürfel-Variante. Solide Konstruktion und gute Drehbarkeit. Für Fortgeschrittene. Variation des Helikopter Cubes (Art. 9232), Ausgeklügelter, faszinierender Mechanismus, Geschwungene Linienführung, sehr gute Verarbeitung, flüssige Drehbewegungen sind möglich, eine Herausforderung, besonders geeignet für  fortgeschrittene Spieler, schönes Design, begehrt bei Zauberwürfel-Sammlern", Category = "Variations", Price= 12.90M},
                new Cube{Name ="Meffert's Gear Ball", ImageData = getImageAsByteArray(@"Images\MEFFERTS_GEAR BALL.jpg"), ImageMimeType = "image/jpg", Description = "Ball-Zauberwürfel mit Zahnrad Mechanismus. Robuste Fertigung ohne Sticker (Farbige Einzelteile). Qualität und Stabilität von Original Meffert's. Original Gear Ball von Meffert, steckt voller Herausforderungen, die einzelnen Cube-Teile drehen sich dank Zahnradtechnik beim Spielen um sich selbst, steigert die Konzentrationsfähigkeit und trainiert nebenbei den Grips", Category = "Variations", Price= 17.95M}
            };

            context.Cubes.AddRange(cubes);
            context.SaveChanges();
            base.Seed(context);
        }

        private byte[] getImageAsByteArray(string path)
        {
            byte[] ret = null;
            if (string.IsNullOrEmpty(path))
                return ret;

            path = Path.Combine(pathToImagesOrder, path);
            if (!File.Exists(path))
                return ret;

            Image img = System.Drawing.Image.FromFile(path);
            try
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                    ret = ms.ToArray();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error by converting from image to byte: {e.Message}");
            }
            return ret;
        }
        

    }

}
