# Email server password
$env:EMAIL_HOST="smtp.gmail.com"
$env:EMAIL_PORT="587"
$env:EMAIL_HOST_USER="afretesting@gmail.com"
$env:EMAIL_HOST_PASSWORD="tsuvzzyvfqpakuvg"
$env:AFRE_GLOBAL_EMAIL="afretesting@gmail.com"

$env:SECRET_KEY="django-insecure-\$id82njdt5zt@)bbm^ej2+do_d90uy@m9)t-g0dmk3+23!qh5t"
echo $env:SECRET_KEY

$env:ALLOWED_HOSTS="127.0.0.1,afre-backend-db-test.up.railway.app"
echo $env:ALLOWED_HOSTS

$env:CORS_ALLOWED_ORIGINS="http://localhost:3001,http://localhost:3000,http://192.168.4.26:3001,http://192.168.4.26:3000,http://afre-backend-db-test.up.railway.app"

$env:STATIC_ROOT=""
echo $env:STATIC_ROOT

$env:CSRF_COOKIE_SECURE="true"
echo $env:CSRF_COOKIE_SECURE

$env:SESSION_COOKIE_SECURE="true"
echo $env:SESSION_COOKIE_SECURE

$env:DB_NAME="postgres"
$env:DB_USER="postgres"
$env:DB_PASSWORD=""
$env:DB_HOST="localhost"
$env:DB_PORT="5432"

# For Neon DB
# $env:DB_NAME="postgres"
# $env:DB_USER="postgres"
# $env:DB_PASSWORD="JIsJEgPTqaSmUGPnUpUNpiTAHAbXjXmq"
# $env:DB_HOST="localhost"
# $env:DB_PORT="5432"

$env:DB_JWKS_URL="https://api.stack-auth.com/api/v1/projects/811b5674-b9d9-4ac1-a521-0d12a74d822c/.well-known/jwks.json"
$env:DB_USER_URL="https://api.stack-auth.com/api/v1/users/me"
$env:DB_JWT_PROJECT_ID="811b5674-b9d9-4ac1-a521-0d12a74d822c"
$env:DB_JWT_SECRET_SERVER_KEY="ssk_86s1524de6ky4avma3tpnsjpwq9nze7wgsdwm058ksjq8"

# Neon Auth environment variables for Next.js
$env:NEXT_PUBLIC_STACK_PROJECT_ID="811b5674-b9d9-4ac1-a521-0d12a74d822c"
$env:NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pck_jsnp2eh77wsm28d6za69z24q0rafc4417d2h060w83y28"
$env:STACK_SECRET_SERVER_KEY="ssk_sk8txgdcbykba6zb3vjrsbhqk87z3hvt1js5xcecwp6ag"

# Database owner connection string
$env:DATABASE_URL="postgresql://neondb_owner:npg_wYyd5K7FuNXc@ep-damp-waterfall-a8tt7k4n-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
