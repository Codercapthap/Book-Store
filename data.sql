USE [BookStore]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[user_id] [int] NOT NULL,
	[role] [varchar](10) NULL,
	[status] [varchar](20) NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Book]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Book](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category_id] [int] NOT NULL,
	[title] [nvarchar](200) NOT NULL,
	[author] [nvarchar](50) NOT NULL,
	[price] [float] NOT NULL,
	[description] [ntext] NOT NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cart_Information]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart_Information](
	[user_id] [int] NOT NULL,
	[book_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[book_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[image] [varchar](500) NOT NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[province_name] [varchar](50) NOT NULL,
	[city_name] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[city_name] ASC,
	[province_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Delivery]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Delivery](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[method] [varchar](50) NOT NULL,
	[coefficient] [float] NOT NULL,
	[base] [float] NOT NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favourite]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favourite](
	[book_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[book_id] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Image](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[book_id] [int] NULL,
	[image_location] [varchar](200) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Information]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Information](
	[book_id] [int] NOT NULL,
	[order_id] [int] NOT NULL,
	[price] [float] NULL,
	[actual_price] [float] NULL,
	[quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC,
	[book_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[delivery_id] [int] NOT NULL,
	[order_date] [datetime] NOT NULL,
	[location] [varchar](300) NOT NULL,
	[delivery_price] [float] NOT NULL,
	[total_price] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Province]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Province](
	[province_name] [varchar](50) NOT NULL,
	[weight] [int] NOT NULL,
	[zip] [char](6) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[province_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rating]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rating](
	[id] [int] NULL,
	[book_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[comment] [varchar](1000) NULL,
	[stars] [int] NULL,
	[created_at] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[book_id] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sale]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sale](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sale_percent] [int] NOT NULL,
	[category_id] [int] NULL,
	[end_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sub_Category]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sub_Category](
	[category_id] [int] NOT NULL,
	[parent_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](200) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[phone] [char](10) NOT NULL,
	[gender] [bit] NULL,
	[birthday] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ward]    Script Date: 11/27/2023 2:47:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ward](
	[province_name] [varchar](50) NOT NULL,
	[city_name] [varchar](50) NOT NULL,
	[ward_name] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ward_name] ASC,
	[province_name] ASC,
	[city_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Account] ([user_id], [role], [status], [username], [password], [deleted_at]) VALUES (1, N'USER', N'active', N'khiemit02', N'$2y$10$Bw8jv.5A2IY4N7kW.fJVj.fiAFXs8cuShN6dThIDee5G6kUYzHpLa', NULL)
INSERT [dbo].[Account] ([user_id], [role], [status], [username], [password], [deleted_at]) VALUES (2, N'USER', N'active', N'kidkaito1412', N'$2y$10$wTsEO6.ChfCDSeffaY3srOi0Mpcefwpgm9MSZfZPQ02PvwVX9VASm', NULL)
INSERT [dbo].[Account] ([user_id], [role], [status], [username], [password], [deleted_at]) VALUES (3, N'ADMIN', N'active', N'akikohikamari1', N'$2y$10$VedabHi4juJi2fSFKzparOd3ZON/S6OstE95qP3ReCOgwCUEc4GG.', NULL)
GO
SET IDENTITY_INSERT [dbo].[Book] ON 

INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (1, 5, N'Re:Zero: Starting Life in Another World, Vol. 1', N'Tappei Nagatsuki', 14, N'Subaru Natsuki was just trying to get to the convenience store but wound up summoned to another world. He encounters the usual things--life-threatening situations, silver haired beauties, cat fairies--you know, normal stuff. All that would be bad enough, but he''s also gained the most inconvenient magical ability of all--time travel, but he''s got to die to use it. How do you repay someone who saved your life when all you can do is die?', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (2, 5, N'Mushoku Tensei: Jobless Reincarnation (Light Novel) Vol. 11', N'Rifujin Na Magonote', 12.59, N'Rudeus has adventured across continents and survived run-ins with gods--and none of it has prepared him to watch Aisha and Norn when Paul leaves them temporarily in his care. Can he rise to the occasion yet again, or will parenting two preteen girls be the ordeal that ultimately defeats him?!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (3, 5, N'Mushoku Tensei: Jobless Reincarnation (Light Novel) Vol. 25', N'Rifujin na Magonote', 12.59, N'Contact tablets and teleportation circles across the world have stopped functioning. Now, Rudeus and his allies gather at the Superd village, where a powerful subjugation patrol aims to take them out. The third North God Kalman, the former Sword God Gal Farion, and the Ogre God Marta march among their ranks. Rudeus''s team puts their lives on the line in this ultimate clash of the world''s most mighty warriors!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (4, 5, N'Now I''m a Demon Lord! Happily Ever After with Monster Girls in My Dungeon: Volume 6', N'Ryuyu', 7.99, N'Yet again, trouble finds Yuki and disrupts his idyllic life!<>
Yuki’s boisterous new life as a demon lord in a fantasy world continues. One day, while he and his pets are hunting monsters to refill the dungeon’s rapidly depleting coffers, he abruptly runs into Lew’s father. “Give me back my daughter!” the man roars angrily, and misunderstandings lead to him challenging Yuki to a duel. How is our antihero supposed to deal with this hairy development?!<>
In the meantime, Nell, Yuki’s second wife, decides to return to the royal capital as part of her duties as a hero. Yuki means to accompany her as her bodyguard, but an unexpected incident disrupts that plan—someone sets a wild stampede in motion against them. On top of that, a sinister presence lurks in the shadows, intent on targeting Nell. Can the two put a stop to these threats?!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (5, 5, N'I Got a Cheat Skill in Another World and Became Unrivaled in the Real World, Too, Vol. 3 (light novel)', N'Miku', 15, N'Next level up—become “god’s” pupil!<>
Yuuya Tenjou has obtained all kinds of powerful skills and abilities and continues to live his new lifestyle in both the other world and his home world. In the Weald, he comes across a "divine beast" rabbit! "I''ll train you. In exchange, teach me how to use [magic]." He becomes the pupil of the unrivaled rabbit, and at the same time becomes a teacher to a divine beast. Back in his world, the Ousei Academy Sports Day begins but paparazzi aiming to get full coverage of Yuuya show up! Yuuya carelessly ends things with a single hit, sending the school into an uproar.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (6, 5, N'Overlord, Vol. 14 (light novel): The Witch of the Doomed Kingdom (Overlord, 14)', N'Kugane Maruyama', 11.93, N'A caravan flying the flag of the Nation of Darkness has been attacked by a noble who hails from the Re-Estize Kingdom. Coincidence...or conspiracy? Either way, Nazarick interprets this as an act of brazen hostility and readies for war! The people of the kingdom, still reeling from the disastrous battle at Katze Plain, reluctantly prepare themselves for another bloody day. When a ruthless campaign of extermination begins sweeping through the entire country, and near-certain doom looms over them all, every single living being within the kingdom’s borders must decide for themselves how to weather the storm that is Ainz Ooal Gown!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (7, 5, N'Failure Frame: I Became the Strongest and Annihilated Everything With Low-Level Spells (Light Novel) Vol. 8', N'Kaoru Shinozaki', 14.99, N'Mimori Touka must make full use of his much-maligned skills to battle the Sixth Order of Knights! Meanwhile, when the Demon King rears his hellish head in Alion, it''s up to Sogou Ayaka and her Silver World to protect the powerless from his pitiless rampage. That leaves the Goddess Vicius alone with Takao Hijiri. Will they fight the Demon King side by side? Or is there another betrayal on the horizon...?', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (8, 5, N'My Magical Career at Court: Living the Dream After My Nightmare Boss Fired Me from the Mages'' Guild! Volume 1', N'Shusui Hazuki', 7.99, N'
Magic is everything to Noelle. She loves it so much that she puts up with her horrible job at the Mages’ Guild to practice it. The hours are long, the pay is rock-bottom, and the boss is a nightmare! But as long as she has magic, she can withstand the hardships. At least, until the day she hears these dreaded words:“You’re fired.”<>
Noelle’s hometown in the outskirts of the kingdom doesn’t offer many alternatives for a career in magic—especially now that she’s been blacklisted from guild work! Just when it seems like all hope is lost, Noelle’s old friend Luke shows up to give her an opportunity she never could have imagined: a job as a royal court magician.<>
Now Noelle is living the dream, rubbing shoulders with the kingdom’s greatest magicians and showing off her skills. She has a beautiful new workplace and a generous new boss, but how will she cope with intense entrance exams, her marriage-obsessed mother, and the rules of etiquette? What awaits Noelle in her magical new career?', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (9, 6, N'Đám Trẻ Ở Đại Dương Đen', N'Châu Sa Đáy Mắt', 3.23, N'“nỗi buồn không rõ hình thù<>
ta cho nó dáng, ta thu vào lòng<>
ta ôm mà chẳng đề phòng<>
một ngày nó lớn chất chồng tâm can”<>
“kẻ sống muốn đời cạn<>
người chết muốn hồi sinh<>
trần gian bi hài nhỉ?<>
ta còn muốn bỏ mình?”<>
Đám trẻ ở đại dương đen là lời độc thoại và đối thoại của những đứa trẻ ở đại dương đen, nơi từng lớp sóng của nỗi buồn và tuyệt vọng không ngừng cuộn trào, lúc âm ỉ, khi dữ dội. Những đứa trẻ ấy phải vật lộn trong những góc tối tâm lý, với sự u uất đè nén từ tổn thương khi không được sinh ra trong một gia đình toàn vẹn, ấm êm, khi phải mang trên đôi vai non dại những gánh nặng không tưởng.<>
Song song đó cũng là quá trình tự chữa lành vô cùng khó khăn của đám trẻ, cố gắng vươn mình ra khỏi đại dương đen, tìm cho mình một ánh sáng. Và chính những sự nỗ lực xoa dịu chính mình đó đã hóa thành những câu từ trong cuốn sách này, bất kể đau đớn thế nào.<>
Cuốn sách được viết bởi Châu Sa Đáy Mắt, một tác giả GenZ mong muốn cùng các bạn trẻ bộc bạch và vỗ về những xúc cảm chân thật về gia đình, xã hội và chính bản thân.<>', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (10, 6, N'Từ Điển Tiếng “Em” - Tái Bản 2021', N'Khotudien', 2.43, N'Cuốn sách này giống như một chiếc hộp Pandora thú vị và hấp dẫn người đọc, vì bạn không thể đoán trước được tác giả sẽ “định nghĩa” câu nói đó theo nghĩa nào, cho ta thêm thích thú với những ngôn từ đáng yêu sử dụng mỗi ngày.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (11, 6, N'Anh Không Bận, Chỉ Là Không Nhớ Em (Tái Bản 2023)', N'Tuệ Mẫn', 3.08, N'Tuệ Mẫn – một nhà văn được nhiều bạn trẻ yêu thích nhờ lối viết giản dị, nhẹ nhàng và rất đỗi cảm xúc. Bắt đầu cầm bút từ những ngày đầu của tuổi đôi mươi, Tuệ Mẫn bén duyên với nghề viết với cuốn sách đầu tay “Anh đã quên em chưa?”. Những câu chuyện của Tuệ Mẫn như cái ôm vỗ về dịu dàng đến những trái tim biết yêu ngoài kia, để gửi đi hi vọng sau này ai cũng sẽ có được hạnh phúc xứng đáng.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (12, 6, N'Chuyện Kể Rằng Có Nàng Và Tôi', N'Nhiều Tác Giả', 2.49, N'Đối với những người trẻ được sống như ý không phải lúc nào cũng dễ dàng, đặc biệt với những người đã phải trải qua một quãng thời gian khó khăn rồi mới có thể tìm được con người thật của mình, là chính mình. Những câu chuyện tình của họ có nhiều dang dở vì những mặc cảm, rào cản, khao khát được làm điều mình muốn, gắn bó với người mình yêu thương cả đời là các mong ước nhỏ trong lòng. Để rồi khi không thể giãi bày cùng ai, họ mang những điều thầm kín thổi vào những vần thơ nơi chỉ có những “câu chuyện về nàng và tôi”.<>
“Chuyện kể rằng có nàng và tôi” là cuốn sách nhỏ với những áng thơ nhẹ nhàng, lãng mạn thể hiện mối giao hòa đẹp đẽ trong tâm hồn những người con gái. Tình yêu của họ vượt trên tất thảy mọi định kiến, chỉ còn lại là những cảm xúc dạt dào, vô tận. Trong những câu thơ đôi khi họ là những người lãng du cô đơn bước chân qua đám đông tranh cãi ồn ào và luôn khao khát tìm kiếm hạnh phúc.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (13, 6, N'Một Cuốn Sách Trầm Cảm', N'macmart', 3.46, N'Một cuốn sách trầm cảm hay còn có tên Một cuốn sách của macmart là quyển tản văn và thơ bộc bạch những tâm tư, cảm xúc của một người trẻ, một trái tim non dại, một tâm hồn chênh vênh, khắc khoải, đớn đau khi phải đối mặt với hiện thực cuộc sống từ những ngày biết tự ý thức cho đến những bước chân tập tễnh đầu tiên trên hành trình tự trưởng thành, mà chắc hẳn ai cũng từng một lần cảm thấy.<>
Bắt đầu bằng những câu chuyện kể, những lời độc thoại cô đơn với chính mình, nhưng rồi sự xuất hiện của gia đình, bạn bè, của những người xa lạ đã mang đến cho “đứa trẻ” muôn vàn cảm xúc khác biệt. Có thể là chút hy vọng nhỏ nhoi, cũng có thể là nỗi đau tột cùng hay sự thất vọng ngập tràn, tuy nhiên dường như bấy giờ tâm trạng của nhân vật đã không còn đơn độc. Từ đó, có sự xuất hiện của những biến đổi trong cảm xúc, trong chính con người thật của “đứa trẻ” ấy. Và cuối cùng là niềm hi vọng được nhìn thấy ánh sáng tích cực, chút niềm tin về cuộc sống bé nhỏ như một bông hoa mọc ra trên vách đá mà tác giả gửi gắm.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (14, 6, N'Cảm Ơn Anh Đã Đánh Mất Em', N'Trí', 3.43, N'“Hãy đọc để một ngày nào đó, nếu chúng ta gặp lại, ta vẫn muốn được chào nhau một câu, hỏi han nhau vài lời. Và cảm ơn vì năm ấy người đã xuất hiện, cùng nhau dệt nên một đoạn ký ức thật đẹp.”', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (15, 7, N'Eo Thon Nhỏ', N'Khương Chi Ngư', 8.28, N'Lục Trì hiểu ý Đường Nhân, môi cậu khẽ nhếch lên. Đường Nhân nheo mắt. “Sau này phải cười nhiều vào đấy! Cậu cười lên trông đẹp trai lắm.”<>
Nụ cười “thầm kín” của Lục Trì tắt phụt. Cô cười, để lộ hàm răng trắng tinh. “Vừa nãy tớ uống nước mật ong, nước mật ong ngọt ê răng luôn ấy.”<>
Lục Trì nhìn cô. Hai chuyện này thì liên quan gì tới nhau? Đường Nhân bồi thêm: “Nụ cười của cậu… còn ngọt hơn mật ong tớ uống hôm nay.”', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (16, 7, N'Vụng Trộm Yêu Anh (Bộ 2 Tập)', N'Trúc Dĩ', 8.62, N'Vụng trộm yêu anh – Câu chuyện tình yêu xuất phát từ một phía và kết thúc khi hai trái tim đã hòa chung một nhịp. Hóa ra, hạnh phúc là khi người bạn thích cũng thích bạn như vậy!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (17, 7, N'Bên Nhau Trọn Đời (Tái Bản 2022)', N'Cố Mạn', 5.02, N'“Bên nhau trọn đời” là một chuyện tình không quá đau thương, không quá phức tạp nhưng lại khiến người đọc mãi không thể quên. Trong lần tái bản này, “Bên nhau trọn đời” được bổ sung một vài tình tiết chưa từng có trong các phiên bản trước, đồng thời in kèm lời chúc, cùng chữ kí của tác giả Cố mạn. Ngoài ra, sách còn có bộ 5 tranh minh họa màu và 4 bookmark của họa sĩ ENO Hà Hà Vũ.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (18, 7, N'Bến Xe (Tái Bản 2020)', N'Thương Thái Vi', 2.07, N'Thứ tôi có thể cho em trong cuộc đời này<>
chỉ là danh dự trong sạch<>
và một tương lai tươi đẹp mà thôi.<>
Thế nhưng, nếu chúng ta có kiếp sau,<>
nếu kiếp sau tôi có đôi mắt sáng,<>
tôi sẽ ở bến xe này… đợi em.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (19, 7, N'Đường Một Chiều (Bộ 2 Tập)', N'Mộng Tiêu Nhị', 8.83, N'Tình yêu thường gõ cửa trái tim bạn theo một cách mà bạn không thể ngờ tới', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (20, 8, N'Nghĩ Giàu & Làm Giàu (Tái Bản 2020)', N'Napoleon Hill', 3.59, N'Là một trong những cuốn sách bán chạy nhất mọi thời đại. Đã hơn 60 triệu bản được phát hành với gần trăm ngôn ngữ trên toàn thế giới và được công nhận là cuốn sách tạo ra nhiều triệu phú, một cuốn sách truyền cảm hứng thành công nhiều hơn bất cứ cuốn sách kinh doanh nào trong lịch sử.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (21, 8, N'Tạo Lập Mô Hình Kinh Doanh (Tái Bản)', N'Alexander Osterwalder, Yves Pigneur', 9.75, N'Tạo Lập Mô Hình Kinh Doanh mang đến cho bạn những kỹ thuật sáng tạo thiết thực đang được các nhà tư vấn kinh doanh và các công ty hàng đầu thế giới sử dụng. Với đối tượng độc giả mục tiêu là những con người hành động, cuốn sách được thiết kế theo hướng trực quan, dễ hiểu, dễ áp dụng. Cuốn sách dành cho những người sẵn sàng vứt bỏ đường lối tư duy cũ để tiếp nhận những mô hình sáng tạo giá trị mới. Do đó, nó phù hợp với các lãnh đạo, cố vấn và các doanh nhân của mọi tổ chức.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (22, 8, N'Từ Tốt Đến Vĩ Đại - Jim Collins (Tái Bản 2021)', N'Jim Collins', 3.18, N'Jim Collins cùng nhóm nghiên cứu đã miệt mài nghiên cứu những công ty có bước nhảy vọt và bền vững để rút ra những kết luận sát sườn, những yếu tố cần kíp để đưa công ty từ tốt đến vĩ đại. Đó là những yếu tố khả năng lãnh đạo, con người, văn hóa, kỷ luật, công nghệ… Những yếu tố này được nhóm nghiên cứu xem xét tỉ mỉ và kiểm chứng cụ thể qua 11 công ty nhảy vọt lên vĩ đại. Mỗi kết luận của nhóm nghiên cứu đều hữu ích, vượt thời gian, ý nghĩa vô cùng to lớn đối với mọi lãnh đạo và quản lý ở mọi loại hình công ty (từ công ty có nền tảng và xuất phát tốt đến những công ty mới khởi nghiệp), và mọi lĩnh vực ngành nghề. Đây là cuốn sách nên đọc đối với bất kỳ lãnh đạo hay quản lý nào!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (23, 8, N'Những Kẻ Xuất Chúng (Tái Bản 2021)', N'Malcolm Gladwel', 5.18, N'Cuốn sách Những kẻ xuất chúng sẽ giúp bạn tìm ra câu trả lời thông qua các phân tích về xã hội, văn hóa và thế hệ của những nhân vật kiệt xuất như Bill Gates, Beatles và Mozart, bên cạnh những thất bại đáng kinh ngạc của một số người khác (ví dụ: Christopher Langan, người có chỉ số IQ cao hơn Einstein nhưng rốt cuộc lại quay về làm việc trong một trại ngựa). Theo đó, cùng với tài năng và tham vọng, những người thành công đều được thừa hưởng một cơ hội đặt biệt để rèn luyện kỹ năng và cho phép họ vượt lên những người cùng trang lứa.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (24, 9, N'Nhà Lãnh Đạo Không Chức Danh (Tái Bản 2022)', N'Robin Sharma', 3.42, N'Bất kể bạn làm gì trong tổ chức và cuộc sống hiện tại của bạn như thế nào, một thực tế quan trọng duy nhất là bạn có khả năng thể hiện năng lực lãnh đạo. Cho dù sự nghiệp hiện tại của bạn đang ở đâu, bạn vẫn luôn cần phải thể hiện những khả năng tột đỉnh của mình. Cuốn sách này sẽ hướng dẫn bạn làm thế nào để khai thác tối đa khả năng đó, cũng như thay đổi cuộc sống và thế giới xung quanh bạn.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (25, 9, N'Bí Mật Tư Duy Triệu Phú (Tái Bản 2021)', N'T Harv Eker', 3.52, N'Trong cuốn sách này T. Harv Eker sẽ tiết lộ những bí mật tại sao một số người lại đạt được những thành công vượt bậc, được số phận ban cho cuộc sống sung túc, giàu có, trong khi một số người khác phải chật vật, vất vả mới có một cuộc sống qua ngày. Bạn sẽ hiểu được nguồn gốc sự thật và những yếu tố quyết định thành công, thất bại để rồi áp dụng, thay đổi cách suy nghĩ, lên kế hoạch rồi tìm ra cách làm việc, đầu tư, sử dụng nguồn tài chính của bạn theo hướng hiệu quả nhất.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (26, 9, N'How Management Works - Hiểu Hết Về Quản Lý', N'DK', 11.43, N'Với ngôn từ dễ hiểu và hình ảnh nổi bật cùng những dữ liệu hấp dẫn, Hiểu hết về quản lý giải thích mọi điều bạn cần biết để xây dựng các kỹ năng quản lý cũng như phát huy tối đa năng lực nhóm của bạn.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (27, 9, N'Làm Điều Quan Trọng', N'John Doerr', 5.02, N'“Làm điều quan trọng” giống như một quyển nhật ký ghi chép lại kinh nghiệm về những trường hợp điển hình đã thành công nhờ phương pháp OKRs. Với mục đích có thêm ngày càng nhiều các công ty khởi nghiệp, hay những công ty lâu năm cũng sẽ nhận ra những lợi ích và bắt đầu áp dụng OKRs vào mô hình vận hành.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (28, 10, N'Tiktok Marketing', N'Markus Rach', 4.53, N'Để tham gia vào việc quảng cáo trên TikTok, trước tiên các nhà marketing phải hiểu về nền tảng này. Từ thử nghiệm trên TikTok, tác giả Markus Rach đã chia sẻ những kinh nghiệm và học hỏi từ thử nghiệm độc đáo này, giúp người đọc hiểu được cách thức và xu thế marketing mới, mở rộng kiến thức về nền tảng TikTok. Nó sẽ dạy cho bạn những nguyên tắc cơ bản của nền tảng này. Vai trò của một nhà marketing phải biết những thay đổi của môi trường kiến tạo. Chúng ta cần hiểu sự tương tác của công nghệ và xã hội. Chúng ta cần hiểu công nghệ tác động đến hành vi của khách hàng như thế nào và tất nhiên, chúng ta cần điều chỉnh tương tác thị trường thương hiệu của mình như thế nào sao cho vẫn phù hợp. Cho cả hiện tại và tương lai!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (29, 10, N'Trải Nghiệm Khách Hàng Xuất Sắc', N'Nguyễn Dương', 6.11, N'Bạn đang cầm trên tay cuốn sách Trải nghiệm khách hàng xuất sắc được viết từ hơn 22 năm kinh nghiệm, qua nhiều vị trí, môi trường khác nhau của ông Nguyễn Dương, một chuyên gia cấp quốc tế, một trong những người nhiệt huyết và chuyên sâu nhất về trải nghiệm khách hàng.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (30, 10, N'Nguyên Lý Marketing', N'Philip Kotler, Gary Armstrong', 24.43, N'Cuốn sách có thể được xem như là giáo trình kinh điển dành cho bất cứ ai muốn nghiên cứu lĩnh vực marketing, bởi nó chứa bên trong gần như tất cả những gì bạn cần biết về marketing – từ định nghĩa, lý luận, các nguyên tắc, cho đến ứng dụng, ví dụ thực tế. Sách cũng không ngừng được chỉnh sửa, tái biên soạn, cập nhật thêm thông tin, trường hợp nghiên cứu mới cho phù hợp với tình hình kinh tế không ngừng thay đổi.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (31, 11, N'Doanh Nghiệp Của Thế Kỷ 21 (Tái Bản 2019)', N'Robert T Kiyosaki, John Fleming, Kim Kiyosaki', 3.46, N'Một quyển sách khác của tác giả bộ sách nổi tiếng Dạy con làm giàu. Trong cuốn sách này, Robert T. Kiyosaki sẽ chỉ ra cho bạn đọc thấy lý do tại sao mình cần phải gây dựng doanh nghiệp riêng của mình và chính xác đó là doanh nghiệp gì. Nhưng đây không phải là việc thay đổi loại hình doanh nghiệp mình đang triển khai mà đó là việc thay đổi chính bản thân. Tác giả còn cho bạn đọc biết cách thức tìm kiếm những gì mình cần để phát triển doanh nghiệp hoàn hảo, nhưng để doanh nghiệp của mình phát triển thì mình cũng sẽ phải phát triển theo.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (32, 11, N'Thiên Nga Đen (Tái Bản 2020)', N'Nassim Nicholas Taleb', 9.75, N'Trước khi khám phá ra thiên nga đen tồn tại trên đời (ở Úc), người ta vẫn tin rằng tất cả chim thiên nga trên đời đều có màu trắng. Phát hiện bất ngờ này đã thay đổi toàn bộ thế giới quan của nhân loại (về thiên nga).<>
Chúng ta không biết rất nhiều thứ nhưng lại hành động như thể mình có khả năng dự đoán được mọi điều. Và trong cuốn sách này, tác giả Nassim Nicholas Taleb đã đi sâu vào khai thác những sai lầm của tư tưởng cố hữu ấy. Theo ông, “thiên nga đen” là một biến cố tưởng chừng như không thể xảy ra với ba đặc điểm chính: không thể dự đoán, có tác động nặng nề và sau khi nó xảy ra, người ta lại dựng lên một lời giải thích để khiến nó trở nên ít ngẫu nhiên hơn, dễ dự đoán hơn so với bản chất thật của nó. Thành công đáng kinh ngạc của Facebook có thể được coi là một “thiên nga đen”, việc nước Anh rời khỏi Liên minh châu Âu cũng là một “thiên nga đen”. Thiên nga đen luôn ẩn hiện trong mọi mặt của cuộc sống với những tác động khó lường, theo cả hướng tiêu cực và tích cực.<>
Tinh tế, táo bạo nhưng không kém phần thú vị, Thiên Nga Đen chắc chắn là cuốn sách không thể bỏ qua cho những ai đam mê hiểu biết. Và cuốn sách này, bản thân nó cũng chính là một thiên nga đen…', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (33, 11, N'Combo Sách Chiến Tranh Tiền Tệ (Bộ 5 Phần)', N'Song Hong Bing', 27.67, N'Một khi đọc “Chiến tranh tiền tệ - Ai thật sự là người giàu nhất thế giới” bạn sẽ phải giật mình nhận ra một điều kinh khủng rằng, đằng sau những tờ giấy bạc chúng ta chi tiêu hàng ngày là cả một thế lực ngầm đáng sợ - một thế lực bí ẩn với quyền lực siêu nhiên có thể điều khiển cả thế giới rộng lớn này.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (34, 12, N'Tịnh Bình - Tưởng Nhớ Phi Nhung (Bìa Cứng)', N'Michael Arnold, Queenie Nguyễn', 14.67, N'Ngày 28 tháng 9 năm 2021, nữ ca sĩ khả ái của Việt Nam - Phi Nhung - đã ra đi vì căn bệnh Covid-19. Bị nhiễm vi-rút khi tham gia các hoạt động từ thiện Giúp xoa dịu nỗi đau của người dân trong đợt phong tỏa nghiêm trọng nhất ở Sài Gòn, Phi Nhung đã trở thành một trong số gần 43.000 người Việt bị đại dịch cuộc đi này cướp đời.<>
Tròn một năm ngày mất của cố ca sĩ Phi Nhung, cuốn sách Sứ giả thiên đường được phát hành bằng ngôn ngữ tiếng Anh để chia sẻ với độc giả khắp thế giới về câu chuyện cuộc đời và sự hy sinh tột cùng của nghệ sĩ nghệ sĩ phi thường này. Và sau đó được phát hành bản tiếng Việt mang tên "Tịnh Bình - Tưởng Nhớ Phi Nhung"', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (35, 12, N'Khi Hơi Thở Hóa Thinh Không (Tái Bản 2020)', N'Paul Kalanithi', 3.78, N'Khi hơi thở hóa thinh không là tự truyện của một bác sĩ bị mắc bệnh ung thư phổi. Trong cuốn sách này, tác giả đã chia sẻ những trải nghiệm từ khi mới bắt đầu học ngành y, tiếp xúc với bệnh nhân cho tới khi phát hiện ra mình bị ung thư và phải điều trị lâu dài.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (36, 12, N'Người Dẫn Chuyện', N'Lê Thị Thanh Tâm', 6.89, N'Cuốn sách là tập hợp những câu chuyện nhỏ được tích góp, vun bồi qua nhiều năm tháng cuộc đời tác giả trên con đường trở thành một doanh nhân thành đạt và một người phụ nữ viên mãn trong cuộc sống. Bốn phần của cuốn sách là từng bước tác giả xây dựng tên tuổi, thương hiệu của mình. Đó là những câu chuyện về niềm đam mê, sự sáng tạo của tác giả với nghề thực phẩm; những bài học về truyền thông báo chí và sứ mệnh truyền cảm hứng của tác giả đến với các start-up trẻ. Chân dung của nữ doanh nhân toát lên một cách bình dị, thân thuộc qua kỷ niệm của tác giả đối với những món ăn đậm đà truyền thống, những bí quyết của tác giả dành riêng cho phái đẹp, giúp họ luôn tự tin và hoàn thiện bản thân mỗi ngày.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (37, 13, N'Gia Tộc Morgan', N'Ron Chernow', 17.28, N'Hình thành, phát triển, sụp đổ rồi lại hồi sinh, có lẽ không một tổ chức nào ẩn chứa nhiều giai thoại, bí mật hay chủ đề gây tranh cãi gay gắt như đế chế ngân hàng Mỹ – Gia tộc Morgan. Đạt Giải thưởng Sách quốc gia và hiện được coi là một tác phẩm kinh điển, Gia tộc Morgan là cuốn tiểu sử tham vọng nhất từng được viết về một triều đại ngân hàng Mỹ. Cuốn sách vẽ nên bức tranh toàn diện về bốn thế hệ nhà Morgan và các công ty bí mật, mạnh mẽ mà họ sở hữu. Với thế lực của mình, đế chế Morgan đã biến nền kinh tế non trẻ của Mỹ thành một cường quốc công nghiệp mạnh nhất thế giới và khiến trung tâm tài chính thế giới dịch chuyển từ London sang New York. Vượt xa cả lịch sử đơn thuần của ngành ngân hàng Mỹ, cuốn sách chính là câu chuyện về sự tiến hóa của nền tài chính hiện đại. Dựa trên các cuộc phỏng vấn rộng rãi cùng quyền truy cập đặc biệt vào kho lưu trữ của gia tộc này, tác đã khắc họa nên bức chân dung hấp dẫn về câu chuyện riêng của nhà Morgan và thế giới hiếm hoi của giới tinh hoa Mỹ và Anh.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (38, 13, N'Tự Truyện Benjamin Franklin (Tái Bản 2018)', N'Benjamin Franklin', 3.78, N'Franklin (1706-1790) là một chính khách, nhà ngoại giao, nhà văn, nhà khoa học và sáng chế, một trong những người uyên bác và tài năng nhất nước Mỹ thuộc địa, và là một nhân vật quan trọng trong cuộc chiến đấu giành độc lập của người Mỹ.<>
Benjamin Franklin được coi là một trong những nhà lập quốc vĩ đại của nước Mỹ. Ông là người duy nhất đã ký tên vào cả bốn văn kiện quan trọng trong lịch sử nước Mỹ : Bản Tuyên ngôn Độc lập, Hiệp ước đồng minh với Pháp, Hiệp ước Paris và Bản Hiến pháp Hoa Kỳ.<>
Ông từng làm thợ nấu xà phòng, thợ in, nhà văn, khoa học gia kiêm nhà phát minh, lãnh đạo các tổ chức phục vụ cộng đồng. Bên cạnh đó ông cũng là một nhà ngoại giao có tài. Nhiều sử gia Hoa Kỳ công nhận ông là một nhà ngoại giao có năng lực và thành công nhất từ xưa tới nay.<>
Một năm sau ngày Benjamin ông qua đời, cuốn tự truyện của ông được giới thiệu tới công chúng lần đầu tại Paris, tháng Ba năm 1791. Được biết tới với tên gọi The autobiography of Benjamin Franklin - Hồi ký Benjamin Franklin, tác phẩm được viết lại và hoàn thành bởi con trai của Franklin, người sau này là Thống đốc bang New Jersey.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (39, 13, N'Donald Trump - Không Bao Giờ Là Đủ', N'Michael D''Antonio', 6.17, N'Bằng cách này hay cách khác, Donald Trump đã là chủ đề bàn tán trên khắp đất nước Mỹ suốt gần bốn mươi năm nay. Không một ai trong giới kinh doanh, không phải Bill Gates, không phải Steve Jobs, hay kể cả Warren Buffett…  nổi tiếng trong khoảng thời gian dài đến vậy, như Trump. Chia sẻ những quan niệm kinh doanh, quan niệm sống của Trump, rất nhiều quyển sách đã làm. Nhưng, phác họa con người của tổng thống Hoa Kỳ đương nhiệm một cách sâu sát, lật giở cả gia phả, lần theo từng ngày tuổi thơ đến tận khi trưởng thành, để mang đến người đọc cái nhìn đầy đủ về Donald Trump, chỉ có Never Enough (Không Bao Giờ Là Đủ). Đây là tác phẩm của tác giả Michael D’Antonio, cây bút sở hữu giải Pulitzer 1984.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (40, 14, N'Lục Tiểu Linh Đồng Bình Tây Du - Tập 2', N'Lục Tiểu Linh Đồng', 4.12, N'Ngôi sao điện ảnh và truyền hình nổi tiếng Trung Quốc Lục Tiểu Linh Đồng (từng nổi tiếng trong vai Tôn Ngộ Không trong phim TH Tây du ký bản cũ) bằng góc nhìn của người trong cuộc đã đưa ra những nhận xét sắc nhọn về tác phẩm văn học Tây Du Ký. Đây là một trong bốn tác phẩm văn học cổ điển nổi tiếng của Trung Quốc, đã lưu truyền được hơn 400 năm, được phổ biến rộng rãi khắp nhiều nơi trên thế giới.<>
Lục Tiểu Linh Đồng bình Tây Du (tập 1,2) thực sự sinh động với nhiều câu chuyện hậu trường lần đầu được công bố, giúp độc giả và khán giả yêu thích phim Tây Du Ký thêm hiểu sâu sắc hơn về tác phẩm văn học này và về tác giả Tây Du Ký là Ngô Thừa Ân. Ẩn chứa phía sau tác phẩm là triết lý cuộc sống và giá trị khởi phát của trí tuệ nhân sinh trong cuộc sống hiện thực đương đại. Tác phẩm đã trở thành best-seller tại Trung Quốc ngay sau khi mới phát hành năm 2008. Nhiều hội thảo về tác phẩm này đã được tổ chức tại nhiều thành phố lớn ở Trung Quốc, trong đó tác giả Lục Tiểu Linh Đồng từng được mời đi nói chuyện ở nhiều trường học, nhiều địa phương về tác phẩm này.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (41, 14, N'Trịnh Công Sơn - Thư Tình Gửi Một Người', N'Trịnh Công Sơn', 6.75, N'Tập Thư tình gửi một người của Nhà xuất bản Trẻ ra mắt nhân kỷ niệm mười năm ngày nhạc sĩ Trịnh Công Sơn từ trần (1/4/2001 - 1/4/2011); đầu sách này cũng ở trong số các ấn phẩm đặc biệt ra đời trong tháng kỷ niệm 30 năm ngày thành lập Nhà xuất bản Trẻ (1981 - 2011).<>
Thông qua những lá thư của nhạc sĩ Trịnh Công Sơn gửi cô gái Huế có tên Ngô Vũ Dao Ánh, người đọc không chỉ tìm thấy vẻ đẹp kỳ diệu của một tình yêu huyền nhiệm mà còn hiểu được những lo âu, dằn vặt triền miên của nhạc sĩ về kiếp người, về lòng tin và những điều tốt đẹp đang bị mai một dần trong cõi nhân gian. Bên cạnh gia tài đồ sộ về âm nhạc của Trịnh Công Sơn, đây có thể được xem là một áng văn chương thật ấn tượng trong đời hoạt động nghệ thuật của ông.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (42, 14, N'Châu Nhuận Phát - Đại Hiệp Hồng Kông', N'Lin Feng', 5.82, N'Cuốn sách đầy đủ và chi tiết nhất về ngôi sao điện ảnh Hồng Kông Châu Nhuận Phát từng được phát hành trên thế giới.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (43, 15, N'Moriarty The Patriot - Tập 1', N'Ryosuke Takeuchi, Hikaru Miyoshi', 1.74, N'Vào thế kỷ 19, đế chế Anh quốc áp đặt sự thống trị của mình bao trùm khắp thế giới. Tầng lớp quý tộc tự cho mình những đặc ân chưa từng thấy, khiến hố ngăn giai cấp ngày càng bị đào sâu.<>
Sinh ra trong một gia đình quý tộc như thế, nhưng Albert James Moriarty cảm thấy chán ghét chính dòng máu đang chảy trong người mình, và trong một lần thăm cô nhi viện, cậu đã tìm thấy hai đứa trẻ cùng chung lý tưởng. Cậu quyết định nhận nuôi cả hai, bước đầu tiên đưa William James Moriarty bước lên vũ đài, với khát khao thay đổi thế giới, mang lại một cuộc sống tươi đẹp hơn cho nhân loại.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (44, 15, N'BlueLock - Tập 17 - Tặng Kèm Card PVC', N'Muneyuki Kaneshiro, Yusuke Nomura', 1.35, N'Trận đấu giữa BLUELOCK với tuyển U-20 hớp hồn người xem bằng những màn trình diễn bứt phá giới hạn của các cầu thủ! Trong khi ân oán giữa anh em nhà Itoshi ngày càng sâu sắc và trận bóng đá đẳng cấp không thể đoán trước đang diễn ra thì Nagi, Bachira, Isagi, tất cả đều nhắm đến bàn thắng “dành riêng cho mình”! Liệu ước mơ và sự kiên định của Ego Jinpachi có thể lật đổ nền bóng đá Nhật Bản hiện tại hay không!? Và chủ nhân của cú sút phân định thắng bại chính là…', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (45, 15, N'Nhóc Miko! Cô Bé Nhí Nhảnh - Tập 37', N'ONO Eriko', 0.97, N'Miko là cô nhóc lớp 6 vô cùng hoạt bát, khỏe khoắn. Ngày nào cũng rộn ràng, náo nhiệt cùng gia đình và bạn bè xung quanh ☆ Trong những chuỗi ngày ấy, Mari rốt cuộc lại đóng vai thần tình yêu Cupid để tác hợp cho Miko và Tappei...!?♥ Và thế là tình cảm của hai cô cậu trở thành tâm điểm chú ý ★ Tập này còn đầy ắp những câu chuyện về cô nhóc Miko đáng yêu, như chạy tiếp sức trong hội thao cuối cùng của thời tiểu học, câu chuyện đau xót của Rinka hay những chuyện bí mật của con gái chúng mình! Lại còn bài phát biểu cực kỳ quan trọng nữa chứ!!!??? Trời ơi? Muốn đọc quá đi ~!!!', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (46, 16, N'100 Kỹ Năng Sinh Tồn', N'Clint Emerson', 2.82, N'Bạn sẽ làm gì nếu như một ngày bị mắc kẹt giữa vùng lãnh thổ có dịch bệnh hoành hành, lạc ở nơi hoang dã, bị móc túi khi đi du lịch ở đất nước xa lạ, hay phải thoát ngay khỏi một vụ hỏa hoạn ở nhà cao tầng… ? Clint Emerson – một cựu Đặc vụ SEAL, lực lượng tác chiến đặc biệt của Hải quân Hoa Kỳ – muốn bạn có được sự chuẩn bị tốt nhất trong cuốn sách 100 kỹ năng sinh tồn này.<>
Rõ ràng, chi tiết và được trình bày dễ hiểu, cuốn sách này phác thảo chi tiết nhiều chiến lược giúp bảo vệ bạn và những người bạn yêu thương, dạy bạn cách suy nghĩ và hành động như một thành viên của lực lượng quân đội tinh nhuệ Hoa Kỳ. 100 kỹ năng sinh tồn thực sự là cuốn cẩm nang vô giá. Bởi lẽ, khi nguy hiểm xảy ra, bạn chẳng có nhiều thời gian cho những chỉ dẫn phức tạp đâu.', NULL)
INSERT [dbo].[Book] ([id], [category_id], [title], [author], [price], [description], [deleted_at]) VALUES (47, 16, N'Thế Nào Và Tại Sao - Thời Tiết Không Khí, Gió Và Mây', N'Manfred Baur', 2.94, N'Cuốn sách giải thích các yếu tố làm nên khí hậu và sự ảnh hưởng của khí hậu tới các vùng miền trên Thế giới', NULL)
SET IDENTITY_INSERT [dbo].[Book] OFF
GO
INSERT [dbo].[Cart_Information] ([user_id], [book_id], [quantity]) VALUES (3, 5, 3)
INSERT [dbo].[Cart_Information] ([user_id], [book_id], [quantity]) VALUES (3, 7, 5)
INSERT [dbo].[Cart_Information] ([user_id], [book_id], [quantity]) VALUES (3, 9, 9)
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (1, N'Văn Học', N'/images/cate13.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (2, N'Kinh Tế', N'/images/cate14.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (3, N'Tiểu Sử - Hồi Ký', N'/images/cate15.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (4, N'Sách Thiếu Nhi', N'/images/cate16.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (5, N'Light Novel', N'/images/cate1.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (6, N'Truyện Ngắn - Tản Văn', N'/images/cate2.png', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (7, N'Ngôn Tình', N'/images/cate3.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (8, N'Nhân vật - Bài Học Kinh Doanh', N'/images/cate4.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (9, N'Quản Trị - Lãnh Đạo', N'/images/cate5.png', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (10, N'Marketing - Bán Hàng', N'/images/cate6.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (11, N'Phân Tích Kinh Tế', N'/images/cate7.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (12, N'Câu Chuyện Cuộc Đời', N'/images/cate8.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (13, N'Chính Trị', N'/images/cate9.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (14, N'Nghệ Thuật Giải Trí', N'/images/cate10.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (15, N'Manga - Comic', N'/images/cate11.jpg', NULL)
INSERT [dbo].[Category] ([id], [name], [image], [deleted_at]) VALUES (16, N'Kiến Thức Bách Khoa', N'/images/cate12.jpg', NULL)
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ho Chi Minh', N'1 district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ha Noi', N'Ba Dinh district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Can Tho', N'Binh Thuy district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Can Tho', N'Cai Rang district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ha Noi', N'Cau Giay district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ha Noi', N'Dong Da district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ho Chi Minh', N'Go Vap district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ha Noi', N'Hoan Kiem district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Can Tho', N'Ninh Kieu district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Can Tho', N'O Mon district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district')
INSERT [dbo].[City] ([province_name], [city_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district')
GO
SET IDENTITY_INSERT [dbo].[Delivery] ON 

INSERT [dbo].[Delivery] ([id], [method], [coefficient], [base], [deleted_at]) VALUES (1, N'standard', 1.2, 0.5, NULL)
INSERT [dbo].[Delivery] ([id], [method], [coefficient], [base], [deleted_at]) VALUES (2, N'fast', 1.6, 0.7, NULL)
SET IDENTITY_INSERT [dbo].[Delivery] OFF
GO
SET IDENTITY_INSERT [dbo].[Image] ON 

INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (1, 1, N'/images/913lGLIcg6L._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (2, 1, N'/images/8130zLXjZPL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (3, 2, N'/images/81nk-b7+tNL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (4, 3, N'/images/913zdYi42TL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (5, 4, N'/images/81V1Zmh2vZL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (6, 5, N'/images/91jpedY6JOL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (7, 6, N'/images/81t31oa9owL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (8, 7, N'/images/81Tofor6dpL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (9, 8, N'/images/81oLW1MS+DL._SL1500_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (10, 9, N'/images/8935325011559.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (11, 9, N'/images/_m_tr_i_d_ng_en_b_a_tr_c.png')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (12, 9, N'/images/_m_tr_i_d_ng_en_b_a_sau.png')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (13, 10, N'/images/bia_tudientiengem-_1_.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (14, 11, N'/images/9786043925593.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (15, 11, N'/images/2023_03_13_12_42_34_5-390x510.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (16, 12, N'/images/bia_chuyen-ke-rang-co-nang-va-toi_final.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (17, 12, N'/images/chuyen_ke_rang_co_nang_va_toi_2_2022_07_30_11_19_47.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (18, 13, N'/images/motcuonsachtramcam1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (19, 13, N'/images/motcuonsachtramcam2.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (20, 14, N'/images/bbbcam-on-anh-da-danh-mat-em.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (21, 14, N'/images/bia-mem_cam-on-anh-da-danh-mat-em.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (22, 15, N'/images/8935212359276.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (23, 16, N'/images/vungtromyeuanh.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (24, 17, N'/images/9786043494631.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (25, 17, N'/images/2022_07_20_14_45_52_5-390x510.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (26, 18, N'/images/8935212349208.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (27, 18, N'/images/2023_02_13_18_28_17_5-390x510.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (28, 19, N'/images/dmc2t600.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (29, 19, N'/images/bia_duong-mot-chieu_t_p-1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (30, 19, N'/images/bia_duong-mot-chieu_t_p-2.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (31, 20, N'/images/nghigiaulamgiau_110k-01_bia-1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (32, 20, N'/images/nghigiaulamgiau_110k-01_bia_sau.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (33, 21, N'/images/t_o-l_p-m_-h_nh-kd-26.04.2021.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (34, 22, N'/images/nxbtre_full_09462021_024609.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (35, 23, N'/images/image_230370.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (36, 24, N'/images/8934974179184.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (37, 24, N'/images/2022_11_18_15_50_36_5-390x510.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (38, 25, N'/images/image_188995_1_1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (39, 25, N'/images/bi_mat_tu_duy_trieu_phu_1_1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (40, 26, N'/images/image_244718_1_5485.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (41, 27, N'/images/cover-measure-what-matte-_b_a_1_1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (42, 28, N'/images/tiktok_outline-01_1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (43, 28, N'/images/tiktok_outline-02_1.png')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (44, 29, N'/images/image_195509_1_49944.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (45, 30, N'/images/z3191421803753_d34be7758308b8ee74572ebf885cbf9a.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (46, 31, N'/images/image_195509_1_603.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (47, 32, N'/images/image_195509_1_27686.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (48, 33, N'/images/combo-05122022003.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (49, 34, N'/images/t_nh_b_nh_-_t_ng_nh_phi_nhung_b_a_c_ng_-_b_a_1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (50, 34, N'/images/t_nh_b_nh_-_t_ng_nh_phi_nhung_b_a_c_ng_-_b_a_4.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (51, 35, N'/images/image_195509_1_34396.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (52, 36, N'/images/ng_i-d_n-truy_n-1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (53, 37, N'/images/image_216020.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (54, 37, N'/images/morgan_bia_final-01_1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (55, 38, N'/images/image_176921.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (56, 39, N'/images/8935086844281-1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (57, 40, N'/images/image_191162.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (58, 40, N'/images/luc_tieu_linh_dong_binh_tay_du___tap_2_6_2020_10_05_16_54_37.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (59, 41, N'/images/8934974175230.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (60, 42, N'/images/daihiephongkongchaunhuanphat_168k_bia-01.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (61, 43, N'/images/nxbtre_full_27332023_033315.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (62, 44, N'/images/bluelock_bia_tap-17-1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (63, 44, N'/images/bluelock_bia_tap_17.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (64, 44, N'/images/bluelock_pvc_card_tap_17.png')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (65, 45, N'/images/nxbtre_full_14022023_110229_1.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (66, 46, N'/images/8935212351621.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (67, 47, N'/images/image_195509_1_30511.jpg')
INSERT [dbo].[Image] ([id], [book_id], [image_location]) VALUES (68, 47, N'/images/the_nao_va_tai_sao___thoi_tiet_khong_khi__gio_va_may_3_2020_10_07_14_15_57.jpg')
SET IDENTITY_INSERT [dbo].[Image] OFF
GO
INSERT [dbo].[Province] ([province_name], [weight], [zip]) VALUES (N'Can Tho', 0, N'900000')
INSERT [dbo].[Province] ([province_name], [weight], [zip]) VALUES (N'Ha Noi', 10, N'100000')
INSERT [dbo].[Province] ([province_name], [weight], [zip]) VALUES (N'Ho Chi Minh', 3, N'700000')
GO
INSERT [dbo].[Rating] ([id], [book_id], [user_id], [comment], [stars], [created_at]) VALUES (NULL, 1, 1, N'I fully recommend this seller if you ever want a book… Had some folds in the corner as they previously mentioned but nothing to worry about. Readable and great look.', 5, CAST(N'2023-11-27' AS Date))
INSERT [dbo].[Rating] ([id], [book_id], [user_id], [comment], [stars], [created_at]) VALUES (NULL, 1, 2, N'I ordered this because I love Re:Zero… so I was very glad to see that it arrived with no damage', 5, CAST(N'2023-11-27' AS Date))
INSERT [dbo].[Rating] ([id], [book_id], [user_id], [comment], [stars], [created_at]) VALUES (NULL, 1, 3, N'The translations are definitely off but they didn''t stop me from enjoying myself', 5, CAST(N'2023-11-27' AS Date))
GO
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (5, 1)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (6, 1)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (7, 1)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (8, 2)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (9, 2)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (10, 2)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (11, 2)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (12, 3)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (13, 3)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (14, 3)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (15, 4)
INSERT [dbo].[Sub_Category] ([category_id], [parent_id]) VALUES (16, 4)
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([id], [name], [email], [phone], [gender], [birthday]) VALUES (1, N'nguyen khiem', N'nguyenkhiemit02@gmail.com', N'0739285931', 1, CAST(N'2001-12-24' AS Date))
INSERT [dbo].[Users] ([id], [name], [email], [phone], [gender], [birthday]) VALUES (2, N'kaito kid', N'kidkaito1412.1@gmail.com', N'0739285493', 1, CAST(N'2001-10-02' AS Date))
INSERT [dbo].[Users] ([id], [name], [email], [phone], [gender], [birthday]) VALUES (3, N'akiko', N'akikohikamari1@gmail.com', N'0739282039', 0, CAST(N'2001-07-14' AS Date))
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district', N'1 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'1 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'1 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'10 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'10 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'11 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'11 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'12 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'12 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'13 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'13 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'14 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'14 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'15 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'15 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'16 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'17 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district', N'2 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'2 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'2 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district', N'3 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'3 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'3 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district', N'4 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'4 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'4 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district', N'5 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'5 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'5 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district', N'6 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'6 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'6 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Binh Thanh district', N'7 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'7 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'7 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'8 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'8 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Go Vap district', N'9 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Binh district', N'9 ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Binh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Cu ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Hoa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Hoi ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Khanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Lac ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Nghiep ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'An Phu ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'An Thoi ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Cai Rang district', N'Ba Lang ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Ben Nghe ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Ben Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'Binh Thuy ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'Bui Huu Nghia ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'Cai Khe ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Cat Linh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Cau Kho ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Cau Ong Lanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'O Mon district', N'Chau Van Liem ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Chuong Duong Do ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Co Giang ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Cong Vi ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Cua Dong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Cua Nam ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Da Kao ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Dich Vong Hau ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Dich Vong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Dien Bien ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Doi Can ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Dong Xuan ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Giang Vo ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Bac ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Bai ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Bo ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Bong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Hang Bot ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Buom ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Dao ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Gai ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Ma ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Hang Trong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Hiep Tan ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Hoa Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'Hung Loi ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Cai Rang district', N'Hung Phu ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Cai Rang district', N'Hung Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Kham Thien ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Khuong Thuong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Kim Ma ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Lang Ha ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Lang Thuong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Cai Rang district', N'Le Binh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Lieu Giai ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'Long Hoa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'O Mon district', N'Long Hung ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'Long Tuyen ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Ly Thai To ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Mai Dich ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Nam Dong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Nga Tu So ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Nghia Do ward')
GO
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Nghia Tan ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Ngoc Ha ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Ngoc Khanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Nguyen Cu Trinh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Nguyen Thai Binh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Nguyen Trung Truc ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'O Cho Dua ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Pham Ngu Lao ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Phan Chu Trinh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Phu Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Phu Tho Hoa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Cai Rang district', N'Phu Thu ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Phu Trung ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Phuc Tan ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Phuc Xa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'O Mon district', N'Phuoc Thoi ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Phuong Lien ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Dong Da district', N'Phuong Mai ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Quan Hoa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Quan Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Son Ky ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'Tan An ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'1 district', N'Tan Dinh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Cai Rang district', N'Tan Phu ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Tan Quy ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Tan Son Nhi ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Tan Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Tan Thoi Hoa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ho Chi Minh', N'Tan Phu district', N'Tay Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Thanh Cong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'Thoi An Dong ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'O Mon district', N'Thoi An ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'Thoi Binh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'O Mon district', N'Thoi Hoa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'O Mon district', N'Thoi Long ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Cai Rang district', N'Thuong Thanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'Tra An ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Binh Thuy district', N'Tra Noc ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Tran Hung Dao ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Hoan Kiem district', N'Trang Tien ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Truc Bach ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Trung Hoa ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'O Mon district', N'Truong Lac ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Ba Dinh district', N'Vinh Phuc ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Can Tho', N'Ninh Kieu district', N'Xuan Khanh ward')
INSERT [dbo].[Ward] ([province_name], [city_name], [ward_name]) VALUES (N'Ha Noi', N'Cau Giay district', N'Yen Hoa ward')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Account__F3DBC572D139739C]    Script Date: 11/27/2023 2:47:13 AM ******/
ALTER TABLE [dbo].[Account] ADD UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__AB6E61646A73CBAD]    Script Date: 11/27/2023 2:47:13 AM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__B43B145F2A8B7D19]    Script Date: 11/27/2023 2:47:13 AM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account] ADD  DEFAULT ('USER') FOR [role]
GO
ALTER TABLE [dbo].[Account] ADD  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[Rating] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Book]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Sub_Category] ([category_id])
GO
ALTER TABLE [dbo].[Cart_Information]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[Book] ([id])
GO
ALTER TABLE [dbo].[Cart_Information]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[City]  WITH CHECK ADD FOREIGN KEY([province_name])
REFERENCES [dbo].[Province] ([province_name])
GO
ALTER TABLE [dbo].[Favourite]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[Book] ([id])
GO
ALTER TABLE [dbo].[Favourite]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Image]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[Book] ([id])
GO
ALTER TABLE [dbo].[Order_Information]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[Book] ([id])
GO
ALTER TABLE [dbo].[Order_Information]  WITH CHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[Orders] ([id])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([delivery_id])
REFERENCES [dbo].[Delivery] ([id])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Rating]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[Book] ([id])
GO
ALTER TABLE [dbo].[Rating]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Sale]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Sub_Category]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Sub_Category]  WITH CHECK ADD FOREIGN KEY([parent_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Ward]  WITH CHECK ADD FOREIGN KEY([city_name], [province_name])
REFERENCES [dbo].[City] ([city_name], [province_name])
GO
