import numpy as np
import scipy.signal
from numpy import pi, log10

z = [0.93 + 0.352j]
p = [0.176 + 0.27j]


def calculate_frq_response(zerosArray, polesArray, a=-0.5, k=1):

    W, H = scipy.signal.freqz_zpk(zerosArray, polesArray, k)
    frequencies = W / pi
    magnitude = 20 * log10(abs(H))
    phase_before_filter = np.unwrap(np.angle(H))

    w, h = scipy.signal.freqz([-a, 1.0], [1.0, -a])
    phase_Ap = np.unwrap(np.angle(h))

    phase_after_filter = np.add(phase_before_filter, phase_Ap)

    return frequencies, magnitude, phase_before_filter, phase_after_filter


# hytrsm keda:
# magnitude: (frequencies, magnitude)
# phase before filter: (frequencies, phase_before_filter)
# phase after filter: (frequencies, phase_after_filter)
