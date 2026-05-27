package com.stackapp.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// --- Luxury Palette ---
val BgPrimary = Color(0xFF050C18) // Deep Navy
val BgSecondary = Color(0xFF0A1425) // Lighter Navy
val BgCard = Color(0xFF0E1B30) // Elevated Navy
val GoldPrimary = Color(0xFFD4AF37) // Metallic Gold
val GoldLight = Color(0xFFF1C40F) // Light Gold
val GoldDark = Color(0xFFB8860B) // Rich Gold
val TextSecondary = Color(0xFF808B96) // Muted Steel
val BorderColor = Color(0xFF1B2C40) // Subtle Navy Border

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            StackAppTheme {
                AppNavigator()
            }
        }
    }
}

@Composable
fun StackAppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = GoldPrimary,
            secondary = GoldLight,
            background = BgPrimary,
            surface = BgCard,
            onSurface = Color.White,
            onBackground = Color.White
        ),
        content = content
    )
}

enum class Screen {
    Login, SignUp, Main, Pricing, CryptoPayment
}

@Composable
fun AppNavigator() {
    var currentScreen by remember { mutableStateOf(Screen.Login) }
    var selectedPlan by remember { mutableStateOf<Plan?>(null) }

    AnimatedContent(
        targetState = currentScreen,
        transitionSpec = {
            fadeIn() togetherWith fadeOut()
        },
        label = "ScreenTransition"
    ) { screen ->
        when (screen) {
            Screen.Login -> LoginScreen(
                onLoginSuccess = { currentScreen = Screen.Main },
                onNavigateToSignUp = { currentScreen = Screen.SignUp }
            )
            Screen.SignUp -> SignUpScreen(
                onSignUpSuccess = { currentScreen = Screen.Main },
                onNavigateToLogin = { currentScreen = Screen.Login }
            )
            Screen.Main -> MainScreen(
                onUpgrade = { currentScreen = Screen.Pricing },
                onLogout = { currentScreen = Screen.Login }
            )
            Screen.Pricing -> PricingScreen(
                onBack = { currentScreen = Screen.Main },
                onSelectPlan = { plan -> 
                    selectedPlan = plan
                    currentScreen = Screen.CryptoPayment 
                }
            )
            Screen.CryptoPayment -> CryptoPaymentScreen(
                plan = selectedPlan!!,
                onBack = { currentScreen = Screen.Pricing },
                onPaymentComplete = { currentScreen = Screen.Main }
            )
        }
    }
}

@Composable
fun LoginScreen(onLoginSuccess: () -> Unit, onNavigateToSignUp: () -> Unit) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgPrimary)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(64.dp)
                .background(Brush.linearGradient(listOf(GoldPrimary, GoldLight)), RoundedCornerShape(16.dp)),
            contentAlignment = Alignment.Center
        ) {
            Icon(Icons.Default.FlashOn, contentDescription = null, tint = BgPrimary, modifier = Modifier.size(40.dp))
        }
        Spacer(modifier = Modifier.height(24.dp))
        Text("STACK", fontSize = 32.sp, fontWeight = FontWeight.Black, letterSpacing = (-1).sp, color = GoldPrimary)
        Text("Log in to your account", color = TextSecondary, fontSize = 14.sp)
        Spacer(modifier = Modifier.height(48.dp))

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email Address") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = GoldPrimary,
                unfocusedBorderColor = BorderColor
            )
        )
        Spacer(modifier = Modifier.height(16.dp))
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = GoldPrimary,
                unfocusedBorderColor = BorderColor
            )
        )
        Spacer(modifier = Modifier.height(32.dp))
        Button(
            onClick = onLoginSuccess,
            modifier = Modifier.fillMaxWidth().height(56.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(containerColor = GoldPrimary)
        ) {
            Text("Sign In", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = BgPrimary)
        }
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            "Don't have an account? Sign Up",
            modifier = Modifier.clickable { onNavigateToSignUp() },
            color = GoldLight,
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun SignUpScreen(onSignUpSuccess: () -> Unit, onNavigateToLogin: () -> Unit) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var name by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgPrimary)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Create Account", fontSize = 32.sp, fontWeight = FontWeight.Black, letterSpacing = (-1).sp, color = GoldPrimary)
        Text("Join 50,000+ Stackers", color = TextSecondary, fontSize = 14.sp)
        Spacer(modifier = Modifier.height(48.dp))

        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Full Name") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = GoldPrimary, unfocusedBorderColor = BorderColor)
        )
        Spacer(modifier = Modifier.height(16.dp))
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email Address") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = GoldPrimary, unfocusedBorderColor = BorderColor)
        )
        Spacer(modifier = Modifier.height(16.dp))
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = GoldPrimary, unfocusedBorderColor = BorderColor)
        )
        Spacer(modifier = Modifier.height(32.dp))
        Button(
            onClick = onSignUpSuccess,
            modifier = Modifier.fillMaxWidth().height(56.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(containerColor = GoldPrimary)
        ) {
            Text("Create Account", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = BgPrimary)
        }
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            "Already have an account? Log In",
            modifier = Modifier.clickable { onNavigateToLogin() },
            color = GoldLight,
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PricingScreen(onBack: () -> Unit, onSelectPlan: (Plan) -> Unit) {
    Scaffold(
        containerColor = BgPrimary,
        topBar = {
            CenterAlignedTopAppBar(
                title = { Text("CHOOSE YOUR PATH", fontWeight = FontWeight.Black, fontSize = 18.sp, color = GoldPrimary) },
                navigationIcon = {
                    IconButton(onClick = onBack) { Icon(Icons.Default.Close, contentDescription = null, tint = GoldPrimary) }
                },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(containerColor = BgPrimary)
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(padding).padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(StackData.plans) { plan ->
                PlanCard(plan, onSelectPlan)
            }
        }
    }
}

@Composable
fun PlanCard(plan: Plan, onSelectPlan: (Plan) -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = BgCard),
        shape = RoundedCornerShape(24.dp),
        border = androidx.compose.foundation.BorderStroke(if (plan.isPopular) 2.dp else 1.dp, if (plan.isPopular) GoldPrimary else BorderColor)
    ) {
        Column(modifier = Modifier.padding(24.dp)) {
            if (plan.isPopular) {
                Text("MOST POPULAR", fontSize = 10.sp, fontWeight = FontWeight.Black, color = GoldLight, modifier = Modifier.padding(bottom = 8.dp))
            }
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(plan.name, fontSize = 24.sp, fontWeight = FontWeight.Black)
                Text(plan.price, fontSize = 24.sp, fontWeight = FontWeight.Black, color = if (plan.name == "Free") Color.White else GoldPrimary)
            }
            Spacer(modifier = Modifier.height(16.dp))
            plan.features.forEach { feature ->
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(vertical = 4.dp)) {
                    Icon(Icons.Default.Check, contentDescription = null, tint = GoldLight, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(feature, fontSize = 14.sp, color = TextSecondary)
                }
            }
            Spacer(modifier = Modifier.height(24.dp))
            Button(
                onClick = { if (plan.name != "Free") onSelectPlan(plan) },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = if (plan.isPopular) GoldPrimary else BgSecondary),
                enabled = plan.name != "Free"
            ) {
                Text(if (plan.name == "Free") "Current Plan" else "Upgrade Now", fontWeight = FontWeight.Bold, color = if (plan.name == "Free") Color.Gray else BgPrimary)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CryptoPaymentScreen(plan: Plan, onBack: () -> Unit, onPaymentComplete: () -> Unit) {
    var selectedCoin by remember { mutableStateOf("BTC") }
    
    Scaffold(
        containerColor = BgPrimary,
        topBar = {
            TopAppBar(
                title = { Text("CRYPTO PAYMENT", fontWeight = FontWeight.Black, fontSize = 18.sp, color = GoldPrimary) },
                navigationIcon = {
                    IconButton(onClick = onBack) { Icon(Icons.Default.ArrowBack, contentDescription = null, tint = GoldPrimary) }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = BgPrimary)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier.fillMaxSize().padding(padding).padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("Pay ${plan.cryptoPrice} to Upgrade", fontSize = 20.sp, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center)
            Spacer(modifier = Modifier.height(32.dp))
            
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                listOf("BTC", "ETH", "SOL").forEach { coin ->
                    val isSelected = selectedCoin == coin
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(12.dp))
                            .background(if (isSelected) GoldPrimary else BgSecondary)
                            .border(1.dp, if (isSelected) GoldLight else BorderColor, RoundedCornerShape(12.dp))
                            .clickable { selectedCoin = coin }
                            .padding(12.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(coin, fontWeight = FontWeight.Bold, color = if (isSelected) BgPrimary else TextSecondary)
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(48.dp))
            
            // Mock QR Code
            Box(
                modifier = Modifier
                    .size(200.dp)
                    .background(Color.White, RoundedCornerShape(16.dp))
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.QrCode2, contentDescription = null, tint = Color.Black, modifier = Modifier.size(160.dp))
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            Text("Wallet Address ($selectedCoin)", fontSize = 12.sp, color = TextSecondary)
            Text(
                StackData.cryptoWallets[selectedCoin] ?: "",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 8.dp)
            )
            
            Spacer(modifier = Modifier.weight(1f))
            Button(
                onClick = onPaymentComplete,
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(containerColor = GoldPrimary)
            ) {
                Text("I have sent the payment", color = BgPrimary, fontWeight = FontWeight.Black)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(onUpgrade: () -> Unit, onLogout: () -> Unit) {
    var selectedItem by remember { mutableStateOf(0) }
    val items = listOf("Dashboard", "Playbooks", "Prompts", "Resources", "Mentor")
    val icons = listOf(Icons.Default.Dashboard, Icons.Default.MenuBook, Icons.Default.Bolt, Icons.Default.Folder, Icons.Default.ChatBubble)

    Scaffold(
        containerColor = BgPrimary,
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(32.dp)
                                .background(brush = Brush.linearGradient(listOf(GoldPrimary, GoldLight)), shape = RoundedCornerShape(8.dp))
                                .padding(4.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.FlashOn, contentDescription = null, tint = BgPrimary, modifier = Modifier.size(20.dp))
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Text("STACK", fontWeight = FontWeight.Black, letterSpacing = (-1).sp, fontSize = 24.sp, color = GoldPrimary)
                    }
                },
                actions = {
                    IconButton(onClick = onLogout) { Icon(Icons.Default.Logout, contentDescription = null, tint = TextSecondary) }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = BgPrimary, titleContentColor = Color.White)
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = BgSecondary,
                tonalElevation = 0.dp,
                modifier = Modifier.border(1.dp, BorderColor, RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
            ) {
                items.forEachIndexed { index, item ->
                    NavigationBarItem(
                        icon = { Icon(icons[index], contentDescription = item) },
                        label = { Text(item, fontSize = 10.sp, fontWeight = FontWeight.Bold) },
                        selected = selectedItem == index,
                        onClick = { selectedItem = index },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = GoldPrimary,
                            selectedTextColor = GoldPrimary,
                            unselectedIconColor = TextSecondary,
                            unselectedTextColor = TextSecondary,
                            indicatorColor = Color.Transparent
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            when (selectedItem) {
                0 -> DashboardScreen(onUpgrade)
                1 -> PlaybooksScreen()
                2 -> PromptsScreen()
                3 -> ResourcesScreen()
                4 -> MentorScreen()
            }
        }
    }
}

@Composable
fun DashboardScreen(onUpgrade: () -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(16.dp)
    ) {
        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Column {
                    Text("Good morning, Sarah 👋", fontSize = 20.sp, fontWeight = FontWeight.Medium, color = TextSecondary)
                    Text("Day 14 streak 🔥", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = GoldPrimary)
                }
                Column(horizontalAlignment = Alignment.End, modifier = Modifier.clickable { onUpgrade() }) {
                    Text("Level 7", fontSize = 12.sp, fontWeight = FontWeight.Black, color = GoldPrimary)
                    Text("Free Plan", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = GoldLight)
                }
            }
            Spacer(modifier = Modifier.height(24.dp))
            
            // Hero Stat
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = BgCard),
                shape = RoundedCornerShape(24.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Text("Total Earned", fontSize = 14.sp, color = TextSecondary)
                    Text("$1,247.50", fontSize = 40.sp, fontWeight = FontWeight.Black, color = GoldPrimary)
                    Spacer(modifier = Modifier.height(16.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(modifier = Modifier.size(8.dp).background(GoldPrimary, CircleShape))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("+12% from last week", color = GoldPrimary, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
            Text("Your Progress", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = GoldPrimary)
            Spacer(modifier = Modifier.height(12.dp))
            RoadmapCard()
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
            Text("Recent Achievements", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = GoldPrimary)
            Spacer(modifier = Modifier.height(12.dp))
            Row(modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                StackData.achievements.forEach { achievement -> AchievementBadge(achievement) }
            }
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
            Text("Income History", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = GoldPrimary)
            Spacer(modifier = Modifier.height(12.dp))
            StackData.incomeEntries.forEach { entry ->
                IncomeItem(entry)
                Spacer(modifier = Modifier.height(8.dp))
            }
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun AchievementBadge(achievement: Achievement) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.width(100.dp).clip(RoundedCornerShape(16.dp)).background(BgSecondary).border(1.dp, BorderColor, RoundedCornerShape(16.dp)).padding(12.dp)
    ) {
        Text(achievement.icon, fontSize = 24.sp)
        Spacer(modifier = Modifier.height(8.dp))
        Text(achievement.title, fontSize = 10.sp, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center)
        Text("+${achievement.xp} XP", fontSize = 8.sp, color = GoldPrimary, fontWeight = FontWeight.Black)
    }
}

@Composable
fun QuickActionCard(label: String, icon: ImageVector, modifier: Modifier) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = BgSecondary),
        shape = RoundedCornerShape(16.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
    ) {
        Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(icon, contentDescription = null, tint = GoldPrimary, modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.width(12.dp))
            Text(label, fontSize = 14.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun IncomeItem(entry: IncomeEntry) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = BgSecondary),
        shape = RoundedCornerShape(16.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
    ) {
        Row(modifier = Modifier.padding(16.dp).fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Column {
                Text(entry.method, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Text(entry.date, fontSize = 10.sp, color = TextSecondary)
            }
            Text("+$${entry.amount}", fontWeight = FontWeight.Black, color = GoldPrimary, fontSize = 16.sp)
        }
    }
}

@Composable
fun RoadmapCard() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = BgCard),
        shape = RoundedCornerShape(24.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text("Next Goal: $5,000", fontWeight = FontWeight.Bold)
                Text("24% Done", color = GoldPrimary, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            }
            Spacer(modifier = Modifier.height(12.dp))
            LinearProgressIndicator(progress = { 0.24f }, modifier = Modifier.fillMaxWidth().height(8.dp).clip(CircleShape), color = GoldPrimary, trackColor = BorderColor)
            Spacer(modifier = Modifier.height(16.dp))
            Text("Complete 3 more playbooks to reach this milestone", fontSize = 12.sp, color = TextSecondary)
        }
    }
}

@Composable
fun PlaybooksScreen() {
    val methods = StackData.methods
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        item {
            Text("65+ Playbooks", fontSize = 28.sp, fontWeight = FontWeight.Black, color = GoldPrimary)
            Text("Step-by-step money methods", color = TextSecondary)
            Spacer(modifier = Modifier.height(24.dp))
        }
        items(methods) { method ->
            MethodCard(method)
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
fun MethodCard(method: MoneyMethod) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = BgCard),
        shape = RoundedCornerShape(20.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(method.icon, fontSize = 32.sp)
                Spacer(modifier = Modifier.width(16.dp))
                Column {
                    Text(method.title, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Text(method.category, fontSize = 12.sp, color = TextSecondary)
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                Column {
                    Text("Avg Earnings", fontSize = 10.sp, color = TextSecondary, fontWeight = FontWeight.Bold)
                    Text("${method.income}/mo", fontSize = 16.sp, fontWeight = FontWeight.Black, color = GoldPrimary)
                }
                Button(onClick = {}, colors = ButtonDefaults.buttonColors(containerColor = GoldPrimary), shape = RoundedCornerShape(12.dp)) {
                    Text("Start", fontWeight = FontWeight.Bold, color = BgPrimary)
                }
            }
        }
    }
}

@Composable
fun PromptsScreen() {
    val categories = StackData.promptCategories
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        item {
            Text("Prompt Vault", fontSize = 28.sp, fontWeight = FontWeight.Black, color = GoldPrimary)
            Text("1,000+ Copy-Paste Prompts", color = TextSecondary)
            Spacer(modifier = Modifier.height(24.dp))
        }
        items(categories) { category ->
            Card(
                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                colors = CardDefaults.cardColors(containerColor = BgCard),
                shape = RoundedCornerShape(16.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
            ) {
                Row(modifier = Modifier.padding(20.dp).fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text(category, fontWeight = FontWeight.Bold)
                    Icon(Icons.Default.ArrowForward, contentDescription = null, tint = GoldPrimary)
                }
            }
        }
    }
}

@Composable
fun ResourcesScreen() {
    val resources = StackData.resources
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        item {
            Text("Resource Library", fontSize = 28.sp, fontWeight = FontWeight.Black, color = GoldPrimary)
            Text("Templates, Scripts & Frameworks", color = TextSecondary)
            Spacer(modifier = Modifier.height(24.dp))
        }
        items(resources) { resource ->
            ListItem(
                headlineContent = { Text(resource.title, fontWeight = FontWeight.Bold) },
                supportingContent = { Text(resource.description) },
                leadingContent = { Box(modifier = Modifier.size(40.dp).background(BgSecondary, RoundedCornerShape(8.dp)), contentAlignment = Alignment.Center) { Text(if(resource.type == "PDF") "📄" else if(resource.type == "Notion") "📓" else "📑") } },
                trailingContent = { Icon(Icons.Default.Download, contentDescription = null, tint = GoldPrimary) },
                colors = ListItemDefaults.colors(containerColor = Color.Transparent)
            )
            HorizontalDivider(color = BorderColor)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MentorScreen() {
    var message by remember { mutableStateOf("") }
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("AI Mentor", fontSize = 28.sp, fontWeight = FontWeight.Black, color = GoldPrimary)
        Text("Powered by Claude 3.5 Sonnet", color = TextSecondary, fontSize = 12.sp)
        Spacer(modifier = Modifier.height(24.dp))
        Card(modifier = Modifier.weight(1f).fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = BgSecondary), border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor), shape = RoundedCornerShape(24.dp)) {
            Box(modifier = Modifier.fillMaxSize().padding(24.dp)) {
                Text("What's your goal today? I can help you pick a method, write copy, or scale your current side hustle.", color = TextSecondary, textAlign = TextAlign.Center, modifier = Modifier.align(Alignment.Center))
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            TextField(value = message, onValueChange = { message = it }, modifier = Modifier.weight(1f), placeholder = { Text("Ask your mentor...", color = TextSecondary) }, colors = TextFieldDefaults.colors(focusedContainerColor = BgCard, unfocusedContainerColor = BgCard, focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent, cursorColor = GoldPrimary), shape = RoundedCornerShape(16.dp))
            Spacer(modifier = Modifier.width(12.dp))
            FloatingActionButton(onClick = { message = "" }, containerColor = GoldPrimary, shape = CircleShape, modifier = Modifier.size(56.dp)) {
                Icon(Icons.Default.Send, contentDescription = "Send", tint = BgPrimary)
            }
        }
    }
}
