<?php
const DEFAULT_N = 30;

/**
 * Affiche les résultats FizzBuzz de 1 à N
 * @param int $n Nombre maximal
 * @return void
 */
function fizzBuzz(int $n): void
{
    for ($i = 1; $i <= $n; $i++) {
        $output = '';

        if ($i % 3 === 0) {
            $output .= 'Fizz';
        }
        if ($i % 5 === 0) {
            $output .= 'Buzz';
        }

        echo $output ?: $i;
        echo '<br />';
    }
}

$n = $_GET['n'] ?? DEFAULT_N;
?>

<div>
    <h1>FizzBuzz</h1>
    <form action="" method="get">
        <label for="n">Nombre maximal</label>
        <input type="number" name="n" id="n" value="<?= $n ?>" />
        <input type="submit" value="Calculer" />
    </form>
    <hr />
    <div style="display: flex">
        <div style="flex: 1">
            <h2>PHP</h2>
            <div id="result-php"><?php fizzBuzz($n); ?></div>
        </div>
        <div style="flex: 1; margin-left: 20px;">
            <h2>JS</h2>
            <div id="result-js"></div>
        </div>
    </div>
</div>

<script>
    /**
     * Affiche les résultats FizzBuzz de 1 à N
     * @param {number} n - Nombre maximal
     * @param {Element} target - target DOM Element
     */
    const fizzBuzz = (n, target) => {
        for (let i = 1; i <= n; i++) {
            let output = '';

            if (i % 3 === 0) output += 'Fizz';
            if (i % 5 === 0) output += 'Buzz';

            let element = document.createElement('div');
            element.textContent = (output || i).toString();
            target.appendChild(element);
        }
    };

    fizzBuzz(<?= $n ?>, document.getElementById('result-js'));
</script>
